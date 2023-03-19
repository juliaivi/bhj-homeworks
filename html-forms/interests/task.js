let interestsMain = document.querySelector(".interests_main");
let interests = Array.from(interestsMain.querySelector('ul').children);

interests.forEach((el) => {
  el.addEventListener("change", (event) => {
    let elements = event.target.closest(".interest");
    childrensElPerents = Array.from(elements.querySelectorAll(".interests>.interest"));
  
    function switchElements(elem, isChecked) {
      elem.forEach((el2) => {
        let childrenEl = el2.querySelector("input");
        childrenEl.checked = isChecked;
      })
    }

    if (event.target.checked == true) {
      switchElements(childrensElPerents, event.target.checked);
    }
      
    if (event.target.checked == false) { 
      switchElements(childrensElPerents, event.target.checked);
    }
  })
})