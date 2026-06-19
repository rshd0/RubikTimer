let settings = JSON.parse(localStorage.getItem("settings"))

export function deleteSolve(solve_id){
    let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];

    for (let index = 0; index < solves.length ; index++){
        if (solves[index].id === solve_id){
            solves.splice(index, 1);
            break;
        }
    }

    for (let index = 0; index < solves.length; index++){
        if (solves[index].id >= solve_id){
            solves[index].id -= 1
            
        }
    }

    localStorage.setItem(settings.cube_order, JSON.stringify(solves))
}

export function saveSolve(time, scramble, cubeorder, status){
    let data = JSON.parse(localStorage.getItem(settings.cube_order)) || [];

    let id = (data.length > 0) ? data[data.length - 1].id + 1 : 1;
    let today = new Date();
    let day = today.getDay();
    let month = today.getMonth();
    let year = today.getFullYear();
    const pad = (n) => n.toString().padStart(2, "0");
    let date = `${year}/${pad(month)}/${pad(day)}`

    data.push({id: id, time: time, scramble: scramble, cubeorder: cubeorder, date: date, status: status})

    return data;
}

export function get_settings(){
    settings = JSON.parse(localStorage.getItem("settings"));
    if (settings === null){
        return set_default_settings();
    }
    return settings
}

function set_default_settings(){
    settings = {}
    settings.cube_order = "3x3";
    settings.averages = {"ao5" : 5, "ao12" : 12, "ao25" : 25, "ao50" : 50, "ao100" : 100}
    localStorage.setItem("settings", JSON.stringify(settings));
    return settings;
}