let menuLink = Array.from(document.querySelectorAll(".menu__link"));

menuLink.forEach((el) => {
    el.onclick = () => {
        let menu = el.closest('.menu__item').querySelector('.menu');
        let listMenu = el.closest('.menu').querySelectorAll('.menu');

    listMenu.forEach((el) => {
        if (el !== menu) {
            el.classList.remove('menu_active');
        }
    })  
    
    if (menu == null) {
        return true;
    }
      
    menu.classList.toggle('menu_active');   
    return false;          
    }
})

