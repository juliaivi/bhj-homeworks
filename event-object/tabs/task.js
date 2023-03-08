let tab = document.querySelectorAll(".tabs");

tab.forEach((el) => {
    let tabList = Array.from(el.querySelectorAll(".tab"));
    let tabContent = el.querySelectorAll(".tab__content");

    tabList.forEach((el) => {  
        el.addEventListener("click", (event) => {
            let elIndex = tabList.indexOf(el);
            
            tabList.forEach((el) => {
                    el.classList.remove("tab_active");
                })
                
            tabContent.forEach((el) => {
                el.classList.remove("tab__content_active");
            })

            event.target.classList.add("tab_active");
            tabContent[elIndex].classList.add("tab__content_active");
        })   
    })

})

 