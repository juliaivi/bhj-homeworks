let dropdown = document.querySelectorAll(".dropdown");

dropdown.forEach(function(dropDownWrapper) {
    let dropdownValue = dropDownWrapper.querySelector(".dropdown__value");
    let dropdownList = dropDownWrapper.querySelector(".dropdown__list");
    let dropdownItem = Array.from(dropDownWrapper.querySelectorAll(".dropdown__item"));

    document.addEventListener("click", function(e){
        if (e.target !== dropdownValue) {
            dropdownList.classList.remove("dropdown__list_active");
        }
    })

    dropdownValue.addEventListener("click", function() {
        dropdownList.classList.toggle("dropdown__list_active");
    })    
    
    dropdownItem.forEach((el) => {
        el.addEventListener("click", function(event) {
            event.preventDefault();
            dropdownValue.innerText = this.innerText; 
            dropdownList.classList.remove("dropdown__list_active");
        })
    })
})
