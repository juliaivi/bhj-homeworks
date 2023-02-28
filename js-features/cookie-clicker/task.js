let countCliker = Number(document.getElementById("clicker__counter").innerHTML);
let cookie = document.getElementById('cookie');
let counter = countCliker;
let pastTime = new Date();
let style = cookie.style;

cookie.addEventListener("mousedown", function(event) {
    let currentTime = new Date(); 
    style.width = "100px";
    style.height = "100px";
    counter++;
    document.getElementById("clicker__counter").innerHTML = counter;   
    
    let diff = 1 / ((currentTime - pastTime) / 1000) ; 
    document.querySelector('.speed_click').innerHTML = `Скорость клика: ${diff}`;
    pastTime = currentTime; 
})

cookie.addEventListener("mouseup", function(event) {
    style.width = "200px";
    style.height = "200px";
})