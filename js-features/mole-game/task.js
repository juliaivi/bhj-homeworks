let dead = document.getElementById("dead");
let lost = document.getElementById("lost");
let holes = document.querySelectorAll(".hole");

let countDead = dead.textContent;
let countLost = lost.textContent;

holes.forEach((el) => {
    el.addEventListener('click', function(event) {
        if (el.classList.contains('hole_has-mole')) {
            countDead++;
            dead.textContent = countDead;
        } else { 
            countLost++;   
            lost.textContent = countLost;   
        } 
        checkWinnings();
    })
})

function checkWinnings() {
    if (countDead == 10) {
        alert ("Вы победили!");
        khukeStatik(); 
    } 
    
    if (countLost == 5) {
        lost.textContent = countLost;
        alert ("Вы проиграли!"); 
        khukeStatik();
    }
}

function khukeStatik() {
    countDead = 0;
    countLost = 0;
    dead.textContent = countDead;
    lost.textContent = countLost;
}



