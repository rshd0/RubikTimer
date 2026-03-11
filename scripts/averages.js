const settings = JSON.parse(localStorage.getItem("settings"))

function CalculateAverage(solves, time_count){
    if (!solves || solves.length < time_count){
        return "-";
    }

    let remove_count = getTrimCount(time_count)
    
    
    let lastsolves = solves.slice(-time_count), lasttimes = [], sum = 0;
    lastsolves.forEach(solve => {
        if (solve.status === "dnf"){
            lasttimes.push(null);
        }
        else {
            lasttimes.push(solve.time);
        }
    })
    
    let sorted_lasttimes = lasttimes.sort((a, b) => {
        if (a === null && b === null) return 0;
        if (a === null) return 1;
        if (b === null) return -1;

        return b - a;
    });
        
    let dnf_count = sorted_lasttimes.filter(time => time === null).length;
    if (dnf_count > remove_count){
        return "DNF";
    }

    for (let index = 0; index < remove_count; index++){
        sorted_lasttimes.shift();
        sorted_lasttimes.pop();
    }

    

    sorted_lasttimes.forEach(time => sum+=time);
    
    return (sum/(time_count-2))
}

function getTrimCount(time_count){
    if (typeof time_count === "number"){
        let remove_count = Math.ceil((time_count*5)/100);
        return remove_count;
    }
}

export function updateAverages(){
    let solves = JSON.parse(localStorage.getItem(String(settings.cube_order))) || [];
    let averages = JSON.parse(localStorage.getItem("settings"))["averages"];
    let new_average;
    for (let [average, count] of Object.entries(averages)){
        for (let index = 0; index < solves.length; index++){
            if (index+1 >= count){
                let last_solves = solves.slice(index-(count-1), index+1);
                new_average = CalculateAverage(last_solves, count);
            }
            else {
                new_average = "-";
            }
            solves[index]["averages"][average] = new_average;
        }
    }
    localStorage.setItem(String(settings["cube_order"]), JSON.stringify(solves))
}

export function prepareAverages(){
    let AOs = Object.values(JSON.parse(localStorage.getItem("settings"))["averages"])
    let solves = JSON.parse(localStorage.getItem("3x3"))
    
    
    let averages = []
    AOs.forEach(average => {
        averages.push(CalculateAverage(solves, average))        
    })

    

    let averages_dict = {}

    AOs.forEach((n, i) => {
        averages_dict[`ao${n}`] = averages[i];
    })
    
    return averages_dict;
}