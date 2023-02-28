let menuLink = Array.from(document.querySelectorAll(".menu__link"));

menuLink.forEach((el) => {
    el.onclick = () => {
        let parent = el.closest('.menu__item');
        let daughter = parent.querySelector('.menu');
        let menu = el.closest('.menu');
        let listMenu = menu.querySelectorAll('.menu');
        
        for (let i = 0; i < listMenu.length; i++) {
            listMenu[i].classList.remove('menu_active');
        }
        
        daughter.classList.add('menu_active');
        return false;
    }
})
