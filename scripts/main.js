import {start_timer, stop_timer, is_running} from "./timer.js";
import { prepareAverages } from "./averages.js";
import { renderScramble, smoothScrollTo, renderStatsPanel, updateStates, renderSolveTable} from "./ui.js";
import { saveSolve, deleteSolve, get_settings} from "./storage.js";


let ready_to_start = false;
let is_key_down = false;
let is_cube_order_list_hide = true;
let scramble, getting_ready;


const settings = get_settings()
const timeEl = document.querySelector(".time");
const rubik_scramble = document.querySelector(".scramble");
const dnf_button = document.querySelector(".dnf-button");
const plus_2 = document.querySelector(".plus-2");
const remove_button = document.querySelector(".remove-button");
const buttons = document.querySelectorAll(".button");
const cube_order_button = document.querySelector(".cube-order-button");
const cube2x2 = document.querySelector(".cube2x2");
const cube3x3 = document.querySelector(".cube3x3");
const cube_order_list  = document.querySelector(".dropdown-cube-order-options_hide");


document.addEventListener("keydown", function(event){
    if (event.code === "Space"){
        event.preventDefault();
        if (is_running){
            let settings = get_settings()
            let time = stop_timer();
            let solves = saveSolve(time, scramble, settings["cube_order"], "normal");
            localStorage.setItem(settings["cube_order"], JSON.stringify(solves))
            
            let averages = prepareAverages()
            
                        
            for (let [key, value] of Object.entries(averages)){
                averages[key] = isNaN(value) ?  value : Number(value);
            }

            solves[solves.length - 1]["averages"] = averages
            
            localStorage.setItem(settings.cube_order, JSON.stringify(solves));
                    
            renderSolveTable(settings);
            renderStatsPanel(solves, settings);

            is_key_down = false;
            timeEl.className = "time";

            rubik_scramble.style.opacity = "1";
            buttons.forEach(button => button.style.opacity = "1");
            cube_order_button.style.opacity = "1";

            scramble = renderScramble(settings);
        }
        else{
            if (!is_key_down){
                is_key_down = true;
                getting_ready = setTimeout(() => {
                    ready_to_start = true;
                    smoothScrollTo(0, 200);
                    setTimeout(() => {
                        document.body.style.overflow = "hidden";
                    }, 200)
                    rubik_scramble.style.opacity = "0";
                    buttons.forEach(button => button.style.opacity = "0");
                    cube_order_button.style.opacity = "0";

                    timeEl.style.color = "#0d542b";
                }, 250)
                timeEl.style.color = "#82181a";
            }
        }
    }}
)

document.addEventListener("keyup", function(event){
    if (event.code === "Space"){
        event.preventDefault();
        if (!ready_to_start){
            clearTimeout(getting_ready);
            document.body.style.overflow = "auto"
            timeEl.style.color = "#E0E0E0";
            is_key_down = false;
            return;
        }
        if (ready_to_start && !is_running){
            start_timer();
            timeEl.className = "in_running";
            ready_to_start = false;
            timeEl.style.color = "#E0E0E0"
        }
    }
})


dnf_button.addEventListener("click", function(){
    let current_time = timeEl.textContent;
    if (current_time !== "00.000"){
        let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];
        if (solves.length > 0){
            solves[solves.length-1].status = "dnf"; 
            localStorage.setItem(settings.cube_order, JSON.stringify(solves));
            
            updateStates(settings);
        }
        
    }
})


plus_2.addEventListener("click", function(){
    let current_time = timeEl.textContent
    if (current_time !== "00.000"){
        let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];
        if (solves.length > 0){
            if (solves[solves.length-1].status !== "plus2"){
                solves[solves.length-1].time += 2;
                solves[solves.length-1].status = "plus2";
                localStorage.setItem(settings.cube_order, JSON.stringify(solves));
                updateStates(settings);
            }
        }
    }  
})

remove_button.addEventListener("click", function(){
    let current_time = timeEl.textContent
    if (current_time !== "00.000"){
        let solves = JSON.parse(localStorage.getItem(settings.cube_order));
        if (solves.length > 0){
            let id = solves[solves.length-1].id;
            deleteSolve(id);
            updateStates(settings);
        }
    }
})



cube_order_button.addEventListener("click", function(){
    if (is_cube_order_list_hide === true){
        cube_order_list.classList.replace("dropdown-cube-order-options_hide", "dropdown-cube-order-options_show");
        is_cube_order_list_hide = false;
        cube_order_button.textContent = settings.cube_order;
    }
    else {
        cube_order_list.classList.replace("dropdown-cube-order-options_show", "dropdown-cube-order-options_hide");
        is_cube_order_list_hide = true;
        cube_order_button.textContent = settings.cube_order;
    }
})

cube2x2.addEventListener("click", function(){
    is_cube_order_list_hide = true;
    settings.cube_order = "2x2";
    localStorage.setItem("settings", JSON.stringify(settings))
    cube_order_list.classList.replace("dropdown-cube-order-options_show", "dropdown-cube-order-options_hide");
    cube_order_button.textContent = settings.cube_order;
    updateStates(settings);
    scramble = renderScramble(settings);
})

cube3x3.addEventListener("click", function(){
    is_cube_order_list_hide = true;
    settings.cube_order = "3x3";
    localStorage.setItem("settings", JSON.stringify(settings))
    cube_order_list.classList.replace("dropdown-cube-order-options_show", "dropdown-cube-order-options_hide");
    cube_order_button.textContent = settings.cube_order;
    updateStates(settings)
    scramble = renderScramble(settings);
})

cube_order_button.textContent = settings.cube_order;

scramble = renderScramble(settings);
renderSolveTable(settings);

let solves = JSON.parse(localStorage.getItem(settings.cube_order)) || [];

renderStatsPanel(solves, settings)