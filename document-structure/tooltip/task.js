let hasTooltip = document.querySelectorAll(".has-tooltip");

hasTooltip.forEach((el) => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerText = el.title;
    tooltip.dataset.position = "bottom";
    
    el.insertAdjacentElement("afterend", tooltip);

    el.addEventListener("click", showHint);

    function showHint(event) {
        event.preventDefault();
        if (tooltip.classList.contains("tooltip_active")) {
            tooltip.classList.remove("tooltip_active");
            return;
        } 

        const tooltipActive = document.querySelector(".tooltip_active");
        
        if (tooltipActive) {
            tooltipActive.classList.remove("tooltip_active");
        } 

        tooltip.classList.toggle("tooltip_active");
        let locationElement = event.target.getBoundingClientRect();
        tooltip.style.top = locationElement.top + 20 + "px";
        tooltip.style.left = locationElement.left + "px";
    }   
})

