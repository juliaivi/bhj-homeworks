let book = document.querySelector('.book');
let bookControls = document.querySelectorAll(".book__control");
let fontSize = document.querySelectorAll(".font-size");
let colorText = document.querySelector(".book__control_color").querySelectorAll(".color");
let bgColor = document.querySelector(".book__control_background").querySelectorAll(".color");

function fontSizeActiv(event) {
    fontSize.forEach((el) => {
        el.classList.remove("font-size_active");
    })
    event.target.classList.add("font-size_active");
    let size = event.target.dataset.size;

    if (size == 'small') {
        book.classList.remove("book_fs-big");
        book.classList.add("book_fs-small");
    } else if(size == "big") {
        book.classList.remove("book_fs-small");
        book.classList.add("book_fs-big");
    } else {
        book.classList.remove("book_fs-small"); 
        book.classList.remove("book_fs-big"); 
    }
}

function textColorActiv(event) {
    colorText.forEach((el) => {
        el.classList.remove("color_active");
    })
    event.target.classList.add("color_active");
    let color = event.target.dataset.textColor;

    if (color == 'black') {
        book.classList.remove("book_color-whitesmoke"); 
        book.classList.remove("book_color-gray");
        book.classList.add("book_color-black");
    } else if (color == "gray") {
        book.classList.remove("book_color-whitesmoke"); 
        book.classList.remove("book_color-black");
        book.classList.add("book_color-gray");
    } else {
        book.classList.remove("book_color-black"); 
        book.classList.remove("book_color-gray"); 
        book.classList.add("book_color-whitesmoke");
    }
}

function colorBg(event) {
    bgColor.forEach((el) => {
        el.classList.remove("color_active");
    })
    event.target.classList.add("color_active");
    let color = event.target.dataset.bgColor;

    if (color == 'black') {
        book.classList.remove("book_bg-white"); 
        book.classList.remove("book_bg-gray");
        book.classList.add("book_bg-black");
    } else if (color == "gray") {
        book.classList.remove("book_bg-white"); 
        book.classList.remove("book_bg-black");
        book.classList.add("book_bg-gray");
    } else {
        book.classList.remove("book_bg-black"); 
        book.classList.remove("book_bg-gray"); 
        book.classList.add("book_bg-white");
    }
}
bookControls.forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault();
        if (el.classList.contains('book__control_font-size')) {
            fontSizeActiv(event);
        } if (el.classList.contains('book__control_color')) {
            textColorActiv(event);
        } if (el.classList.contains('book__control_background')) {
            colorBg(event);
        }  
    })
})