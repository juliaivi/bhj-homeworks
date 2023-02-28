
let startTimer = Number(document.getElementById('timer').innerHTML);

let countTimer = startTimer;

function subtractTime() {
    if (countTimer == 0) {
        alert("Вы победили в конкурсе!");
        countTimer = startTimer;
        document.getElementById('timer').innerHTML = countTimer;
        return;
    }

    if (countTimer > 0) {
        countTimer--;
        document.getElementById('timer').innerHTML = countTimer;
    }
} 

setInterval(subtractTime, 1000);

//Задания повышенной сложности

let currentYear = new Date().getFullYear();
let nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);

let currentTime = new Date();
let diff = (nextYear - currentTime) / 1000;
let countDownEl = document.getElementById('timer2');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    let hours = Math.floor(diff / 60 / 60) % 24;
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = Math.floor(diff / 60) % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = Math.floor(diff % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countDownEl.innerHTML = `${hours} : ${minutes} : ${seconds}`;
    
    if (diff > 0){ 
        diff--; 
        countDownEl.innerHTML = `${hours} : ${minutes} : ${seconds}`;
        return;
    }
    
    if (diff == 0) {
        countDownEl.innerHTML = `${hours} : ${minutes} : ${seconds}`;
        window.location.assign(url = "text.zip");
    }
}













