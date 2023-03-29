const signin = document.getElementById('signin');
const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const exitBtn = document.getElementById('exit__btn');
const control = document.querySelectorAll('.control');

let user;

let statusInit = initUser();

signinForm.addEventListener("submit", creatingRequest);

exitBtn.addEventListener('click', exitUser);

function creatingRequest(event) {
    event.preventDefault();

    const formData = new FormData(signinForm);
    const xhr = new XMLHttpRequest;
    
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log(`ошибка ${xhr.status} : ${xhr.statusText}`);
        } else if (xhr.status >= 200) {
            let answer = JSON.parse(xhr.responseText);
            
            if (answer.success == true) {
                userId.innerText = answer.user_id;
                signin.classList.remove('signin_active');
                welcome.classList.add('welcome_active');
                
                user = {userId:answer.user_id,};

                localStorage.setItem("user", JSON.stringify(user));

            } else {
                clearField(control);
                alert("Неверный логин/пароль");
            }
        }
    }

    xhr.open("POST", 'https://students.netoservices.ru/nestjs-backend/auth');
    
    xhr.send(formData);
}

function initUser() {

    if (localStorage.length == undefined || localStorage.length == 0 || localStorage.length == null) {
        return false;
    }

    try {
        user = JSON.parse(localStorage.getItem("user"));
        if (user == "" || user == null || user == undefined) {
            return false;
        }
       
        if (user) {
            signin.classList.remove('signin_active');
            userId.innerText = user.userId;
            welcome.classList.add("welcome_active");
        } else {
            signin.classList.add("signin_active");
        }
    } catch {
        return false;
    }
}

function exitUser() {
    welcome.classList.remove('welcome_active');
    clearField(control);
    signin.classList.add('signin_active');
    userId.innerText = '';
    localStorage.removeItem('user');
}

function clearField(elem) {
    elem.forEach((el) => {
        el.value = "";
    })
}