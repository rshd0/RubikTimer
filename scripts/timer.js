import { prepareTime, formateTime } from "./ui.js";

export let is_running = false;
let start_time, timerInterval, end_time, user_time;

const timeEl = document.querySelector(".time");

export function start_timer(){
    is_running = true;
    start_time = performance.now();
    timerInterval = setInterval(() => {
        let current_time = (performance.now() - start_time) / 1000;
        timeEl.textContent = formateTime(current_time.toFixed(1), true);
    }, 20);
}


export function stop_timer(){
    is_running = false;
    clearInterval(timerInterval);
    end_time = performance.now();
    user_time = (end_time - start_time);
    let time = formateTime(prepareTime(user_time), false);
    timeEl.textContent = time;
    return user_time;
}