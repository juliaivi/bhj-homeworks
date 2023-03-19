
const chatWidget = document.querySelector(".chat-widget");
const chatMessages = document.getElementById('chat-widget__messages');
const inputMessage = document.getElementById('chat-widget__input');

const messages = [
    'Добрый день! До свидания!',
    'Кто тут?',
    'Где ваша совесть?',
    'К сожалению, все операторы сейчас заняты. Не пишите нам больше',
    'Мы ничего не будем вам продавать',
    'Вы не купили ни одного товара для того, чтобы так с нами разговаривать',
    'Сначала купите у нас что нибудь, а потом поговорим',
    'Непишите нам больше'
  ];

const startTimer = 30;  
let timer = startTimer; 
let date;

chatWidget.addEventListener("click", () => {
    chatWidget.classList.add("chat-widget_active");
    if (!document.querySelector('.message_client')) {
        setInterval(repeatQuestion, 1000);
    }
})

inputMessage.addEventListener("change", answerClient);
    
function answerClient(event) {
    date = new Date().toLocaleTimeString().substring(0,5);
    let answer = event.target.value.trim();
    
    if (answer == "") {
        return;
    }

    chatMessages.innerHTML += `
        <div class="message message_client">
            <div class="message__time">${date}</div>
            <div class="message__text">${answer}</div>
        </div>
        `;
    
    robotResponse(messages);
    timer = startTimer;
}

function robotResponse(messages) {
    date = new Date().toLocaleTimeString().substring(0,5);
    const random = Math.floor(Math.random() * messages.length);
 
    chatMessages.innerHTML += `
        <div class="message">
            <div class="message__time">${date}</div>
            <div class="message__text">${messages[random]}</div>
        </div>
        `;

    chatMessages.lastElementChild.scrollIntoView(false);
}


function repeatQuestion() {
    if (timer > 0) {
        --timer; 
    }
    
    if (timer == 0) {
        robotResponse(messages);
        timer = startTimer;
    } 
}



