let arrowPrev = document.querySelector(".slider__arrow_prev");
let arrowNext = document.querySelector(".slider__arrow_next"); 
let sliderItem = document.querySelectorAll(".slider__item");
let sliderDot = document.querySelectorAll(".slider__dot");

let active = 0;

function setSlider() {
    sliderItem[active].classList.add('slider__item_active');
    sliderDot[active].classList.add('slider__dot_active');  
}

function clearSlide() {
    sliderItem[active].classList.remove('slider__item_active');
    sliderDot[active].classList.remove('slider__dot_active');
}

arrowPrev.onclick = () => {
    clearSlide();
    if (active - 1 == -1) {
        active = sliderItem.length - 1;
    } else {
        active--;
    }
    setSlider();
}

arrowNext.onclick = () => {
    clearSlide();
    if (active + 1 == sliderItem.length) {
        active = 0;
    } else {
        active++;
    }
    setSlider();
}

sliderDot.forEach((el, index) => {
    el.onclick = () => {
        if (active == index) {
            return;
        }
        clearSlide();
        active = index;
        setSlider();
    }
})