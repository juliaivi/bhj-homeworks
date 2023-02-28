// 1 вариант

let modalMain = document.getElementById("modal_main");
let modalClose = document.querySelectorAll(".modal__close");
let showSuccess = document.querySelector(".show-success");
let modalSuccess = document.getElementById("modal_success");

modalMain.classList.add("modal_active");

modalClose.forEach((el) => {
    el.addEventListener("click", function(event) {
        el.closest(".modal").classList.remove("modal_active");
    })
})

showSuccess.addEventListener("click", function(event) {
    modalSuccess.classList.add("modal_active");
})

// //2 вариант
// let modalMain = document.getElementById("modal_main");//появление окна
// let modalClose = document.querySelectorAll(".modal__close");//для закрытия
// let showSuccess = document.querySelector(".show-success");//смена окна 
// let modalSuccess = document.getElementById("modal_success");//смена окна 
   
// modalMain.classList.add("modal_active");
   
// modalClose.forEach((el) => {
//     el.addEventListener("click", function(event) {
//     let a = el.parentNode;
//     let b = a.parentNode
//     if (b.classList.contains("modal_active")) {
//         b.classList.remove("modal_active");
//     }
//     })
// })

// showSuccess.addEventListener("click", function(event) {
//     modalSuccess.classList.add("modal_active");})
    
    
  

