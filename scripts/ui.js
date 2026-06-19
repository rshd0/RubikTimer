import { deleteSolve, get_settings} from "./storage.js";
import { updateAverages } from "./averages.js";
import { scrambleController } from "./scramble.js";

const rubik_scramble = document.querySelector(".scramble");
const settings = get_settings()
const timeEl = document.querySelector(".time")

export function renderScramble(){
    let cube_order = settings.cube_order
    let scramble = scrambleController(cube_order);
    rubik_scramble.textContent = scramble;
    return scramble;
}


export function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startY + (distance * easeProgress));
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

export function renderSolveTable(){
    let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];
    
    if (solves === null){   
        return;
    }    

    const time_list_div = document.getElementsByClassName("solves_body")[0];
    time_list_div.innerHTML = ""

    let html = "";
    for (let index=solves.length -1 ; index >= 0; index--){
        let current_time_html;

        if (solves[index].status === "normal"){
            current_time_html = `${prepareTime(solves[index].time)}`;
        }
        else if (solves[index].status === "plus2"){
            current_time_html = `${prepareTime(solves[index].time)}<sup>+</sup>`;
        }
        else if (solves[index].status === "dnf"){
            current_time_html = `DNF`;
        }
        html += `
<div class="solve">
    <span class="solve_cell solve_id" data-id="${solves[index].id}">${solves[index].id}</span>
    <span class="solve_cell solve_time" data-id="${solves[index].id}">${current_time_html}</span>
    <span class="solve_cell solve_ao5" data-id="${solves[index].id}">${isNaN(solves[index]["averages"]["ao5"]) ? solves[index]["averages"]["ao5"] : prepareTime(solves[index]["averages"]["ao5"])}</span>
    <svg data-id="${solves[index].id}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="trash_icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
</div>`
    }
    time_list_div.innerHTML = html;

    trash()

    info_cord()
}

export function trash(){
    const trash_icons = document.querySelectorAll(".trash_icon");
    trash_icons.forEach(icon => {
        const id = parseInt(icon.dataset.id);
        icon.addEventListener("click", function () {
            deleteSolve(id);
            updateStates();
        });
    });
}

export function info_cord(){
    const ids = document.querySelectorAll(".solve_id");
    const times = document.querySelectorAll(".solve_time");

    ids.forEach(id => {
        id.addEventListener("click", function(){
            let solves = JSON.parse(localStorage.getItem(settings.cube_order));
            const solveInfoWrapper = document.querySelector(".solve-info-wrapper");
            const close_icon = document.querySelector(".close-icon");
            const id_label = document.querySelector(".solve-id")
            const time_label = document.querySelector(".solve-time");
            const scramble_label = document.querySelector(".solve-scramble");
            const date_label = document.querySelector(".solve-date");
            
            const solve_id = parseInt(id.dataset.id) - 1;
            solveInfoWrapper.style.display = "flex";
            
            id_label.textContent = `Solve #${solves[solve_id].id}`;
            time_label.textContent = prepareTime(solves[solve_id].time);
            date_label.textContent = solves[solve_id].date;
            scramble_label.textContent = solves[solve_id].scramble;

            close_icon.addEventListener("click", function(){
                solveInfoWrapper.style.display = "none";
            })
        })
    })

    times.forEach(time => {
        time.addEventListener("click", function(){
            let solves = JSON.parse(localStorage.getItem(settings.cube_order));
            const solveInfoWrapper = document.querySelector(".solve-info-wrapper");
            const close_icon = document.querySelector(".close-icon");
            const id_label = document.querySelector(".solve-id")
            const time_label = document.querySelector(".solve-time");
            const scramble_label = document.querySelector(".solve-scramble");
            const date_label = document.querySelector(".solve-date");
        
            const solve_id = parseInt(time.dataset.id) - 1;
            solveInfoWrapper.style.display = "flex";
            
            id_label.textContent = `Solve #${solves[solve_id].id}`;
            time_label.textContent = prepareTime(solves[solve_id].time);
            date_label.textContent = solves[solve_id].date;
            scramble_label.textContent = solves[solve_id].scramble;
            
            close_icon.addEventListener("click", function(){
                solveInfoWrapper.style.display = "none";
            })
        })
    })
}

export function prepareTime(time){
    time = (time / 1000).toFixed(3)
    return formateTime(time, false)
}


export function formateTime(time, is_running){
    if (is_running === true){
        if (time >= 60){
            let minutes = Math.floor(time/60);
            let seconds = Math.floor(time%60);
            let milliseconds = (time % 1).toFixed(1).slice(2);
            if (seconds < 10){
                return `${minutes}:0${seconds}.${milliseconds}`;
            }
            return `${minutes}:${seconds}.${milliseconds}`
        }
        return time;
    }
    else if(is_running === false){
        if (time >= 60){
            let minutes = Math.floor(time/60); 
            let seconds = Math.floor(time%60); 
            let milliseconds = (time % 1).toFixed(3).slice(2);
            if (seconds < 10){
                return `${minutes}:0${seconds}.${milliseconds}`;
            }
            return `${minutes}:${seconds}.${milliseconds}`
        }
        return time;
    }
}

export function renderStatsPanel(solves){
    const current_time_element = document.querySelector(".current-time");
    const best_time_element = document.querySelector(".best-time");    
    let times = []
    let averages = getAveragesTimeList()

    solves.forEach(solve => {
        times.push(solve["time"])
    })

    let elements = getAoElements()

    for (let [average, element] of Object.entries(elements)){
        let best = manage_getBests(averages[`ao${average}`]);
        let current = averages[`ao${average}`][averages[`ao${average}`].length - 1];
        
        element["current"].textContent = isNaN(current) ? current : prepareTime(current);
        element["best"].textContent = isNaN(best) ? best : prepareTime(best);
    }

    let current_time = "-"
    if (solves.length >= 1){
        if (solves[solves.length - 1].status === "dnf"){
            current_time = "DNF"
        }
        else{
            current_time = times[times.length - 1];
        }
    }
    
    
    let best_time = manage_getBests(times)
    
    current_time_element.textContent = isNaN(current_time) ? current_time : prepareTime(current_time);
    best_time_element.textContent = isNaN(best_time) ? best_time : prepareTime(best_time);
}


function manage_getBests(solves){
    if (!solves){
        return "-";
    }
    let filtered_timeList = [];

    solves.forEach(solve => {
        if (solve != "-" || solve != "dnf"){
            filtered_timeList.push(solve);
        }
    })
    


    return findBests(filtered_timeList);
    
}

function getAoElements(){
    let averages = JSON.parse(localStorage.getItem("settings"))["averages"]
    let averages_list = []

    for (let average of Object.values(averages)){
        averages_list.push(average)
    }
    
    const map = {}

    averages_list.forEach(n => {
        map[n] = {
            current: document.querySelector(`.current-ao${n}`),
            best: document.querySelector(`.best-ao${n}`)
        }
    })

    return map;
}

function findBests(time_list){
    let filtered_list = []
    
    time_list.forEach(time => {
        if (time != "dnf" && time != "-" && time != "DNF"){
            filtered_list.push(time)
        }
    })
    
    if (filtered_list.length > 0){
        return Math.min(...filtered_list);
    }
    else {
        return "-"
    }
}

export function updateStates(){
    updateAverages();
    let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];
    
    if (solves.length > 0){
        timeEl.textContent = prepareTime(solves[solves.length-1].time);
    }

    else{
        timeEl.textContent = "00.000"
    }
    
    renderSolveTable();  
    renderStatsPanel(solves);
}

function getAveragesTimeList(){
    let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];
    let averages = settings["averages"];
    let averages_dict = {};

    for (let average of Object.keys(averages)){
        let average_list = [];

        for (let solve of solves){
            average_list.push(solve["averages"][String(average)]);
        }
        
        if (solves.length == 0){
            average_list.push("-");
        }
        
        averages_dict[average] = average_list;
    }
    return averages_dict;
}
