let reveal = document.querySelectorAll(".reveal");

document.addEventListener("scroll", function() {
    reveal.forEach((el) => {
        const {top, bottom} = el.getBoundingClientRect();
        
        if (bottom < 0 && top > window.innerHeight) {
            return el.classList.remove('reveal_active');
        }
        return el.classList.add('reveal_active');     
    })
})

