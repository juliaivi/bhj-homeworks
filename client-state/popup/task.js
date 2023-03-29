const modal = document.getElementById('subscribe-modal');
const modalClose = document.querySelector('.modal__close');

modalClose.addEventListener("click", closeModalActive);
window.addEventListener("load", verifyCookie);


function closeModalActive() {
    setCookie('modal', 'close');
    modal.classList.remove("modal_active");
}

function verifyCookie() {
    if (getCookie('modal') == 'close') {
        modal.classList.remove("modal_active");
    } else {
        modal.classList.add("modal_active");
    }
}

function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value);
}

function getCookie(name) {
    const pairs = document.cookie.split("; ");
    const cookie = pairs.find(p => p.startsWith(name + "="));
    return document.cookie.substring(6);
}