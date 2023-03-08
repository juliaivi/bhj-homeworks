class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timer = container.querySelector(".timer");

    this.reset();
    this.registerEvents();
    this.countTimer();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0; 
  }

  registerEvents() {
    document.addEventListener('keydown', event => {
      if (this.currentSymbol.textContent.toLowerCase() === event.key.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    })
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }
 
  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord()
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);

    this.timer.textContent = word.length;
  }
    
  countTimer() {
    setInterval( () => {
      this.timer.textContent--;
      if (this.timer.textContent == 0) {
        this.fail();
      }
    }, 1000);
  } 

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join(''); 
    this.wordElement.innerHTML = html; 

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game')) //запускает функцию - класс(игру)

// //повышенный уровень сложности. Написала с нуля.
// let statusWins = document.querySelector(".status__wins");
// let statusLoss = document.querySelector(".status__loss");
// let word = document.querySelector(".word");

// let timer = document.querySelector(".timer");
// let currentSymbol;

// const words = [
//     'bob',
//     'awesome',
//     'netology',
//     'hello',
//     'kitty',
//     'rock',
//     'youtube',
//     'popcorn',
//     'cinema',
//     'love',
//     'Саша',
//     'Маша',
//     'Даша',
//     'Миша',
//     'javascript'
//    ];

// resetTimers();
// countTimer();

// function resetTimers() {
//   randomWord();
//   statusLoss.textContent = 0;
//   statusWins.textContent = 0;
// }

// function randomWord() {
//   word.replaceChildren();
//   let index = Math.floor(Math.random() * words.length);
//   let letterWord = words[index].split("");
  
//   createElement(letterWord);
//   currentSymbol = word.querySelector(".symbol");
//   timer.textContent = letterWord.length;
// }

// function createElement(letterWord) {
//   for (let i = 0; i < letterWord.length; i++) {
//     let span = document.createElement("span");
//     word.appendChild(span); 
//     span.innerHTML = letterWord[i];
//     span.classList.add("symbol"); 
//   }
// }

// document.addEventListener("keydown", event => {
//   if (event.shiftKey || event.altKey) {
//     return;
//   }
  
//   if(event.key.toLocaleLowerCase() === currentSymbol.textContent.toLocaleLowerCase()) {
//     if (currentSymbol.classList.contains("symbol_current")) {
//       currentSymbol.classList.remove("symbol_current")
//     } else {
//       currentSymbol.classList.add('symbol_correct');
//     }

//     currentSymbol = currentSymbol.nextElementSibling;

//     success();

//     if (currentSymbol == null) {
//       statusWins.textContent++;
//       randomWord();
//       return;
//     }
//   } else {
//     statusLoss.textContent++;
//     this.fail(); 
//     randomWord();
//   }
// })

// function success() {
//   if (statusWins.textContent === "10") {
//     statusWins.textContent++;
//     alert("Вы выиграли!");
//     resetTimers();
//   }
// }

// function fail() {
//   if (statusLoss.textContent === "5") {
//     statusLoss.textContent++;
//     alert("Вы проиграли!");
//     resetTimers();
//   }
// }

// function countTimer() {
//   setInterval(() => {
//     timer.textContent--;

//     if (timer.textContent == 0) {
//       statusLoss.textContent++;
//       randomWord(); 
//     }
//     fail(); 
//   }, 1000);
// }