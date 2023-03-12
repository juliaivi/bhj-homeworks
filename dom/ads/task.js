let card = document.querySelectorAll(".card");

card.forEach((el) => {
    let rotatorCase = Array.from(el.querySelectorAll(".rotator__case"));
    setActive(0)

    function setActive(i) {
        rotatorCase.forEach((el) => {
            el.classList.remove('rotator__case_active');
        })
        rotatorCase[i].classList.add('rotator__case_active');

        let speed = rotatorCase[i].dataset.speed;
        let color = rotatorCase[i].dataset.color;
        rotatorCase[i].style.color = color;
        i++;
        
        if (i == rotatorCase.length) {
            i = 0;
        }

        setTimeout(function(){setActive(i)}, speed)
    }  
})






