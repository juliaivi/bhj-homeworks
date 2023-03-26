let pollTitle = document.getElementById('poll__title');
let pollAnswers = document.getElementById("poll__answers");


let xhr = new XMLHttpRequest();
xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
xhr.addEventListener("readystatechange", showQuery);

function showQuery() {
    if (xhr.readyState !== xhr.DONE) {
        return;
    }

    if (xhr.readyState === xhr.DONE) {
        let dataList = JSON.parse(xhr.responseText);
        let data = dataList.data;
        pollTitle.innerText = data.title;
        
        for (let i = 0; i < data.answers.length; i++) {
            let btnAnswer = `<button class="poll__answer" data-id = ${i}>
                                 ${data.answers[i]}
                            </button>`;
            pollAnswers.insertAdjacentHTML('afterbegin', btnAnswer);
        }

        let answerBtn = Array.from(document.querySelectorAll(".poll__answer"));
        
        answerBtn.forEach((el) => {
            el.addEventListener("click", () => {
                let datasetId = el.dataset.id;

                let xhr1 = new XMLHttpRequest;
                xhr1.open("POST", "https://students.netoservices.ru/nestjs-backend/poll");
                xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr1.addEventListener("readystatechange" ,  getAnswerStat);

                function getAnswerStat () {
                    if (xhr1.readyState !== xhr1.DONE) {
                        return;
                    }

                    if (xhr1.readyState === xhr1.DONE) {
                        pollAnswers.replaceChildren();

                        let  answerList = JSON.parse(xhr1.responseText).stat;
                        console.log (answerList)
                                        
                        let sumVotes = answerList.reduce((a, b) => a += b.votes, 0);
                                
                        for (let item of answerList) {
                            let statAnswer = `<div class = "stat__answer">${item.answer}
                                                <span class = "stat__value">${((item.votes / sumVotes) * 100).toFixed(2)}%.</span>
                                            </div>`;
                             pollAnswers.insertAdjacentHTML("afterbegin", statAnswer);
                        }
                    }
                }

                xhr1.send(`vote=${dataList.id}&answer=${datasetId}`);
                
                alert("Спасибо, ваш голос засчитан!");
            })
        })
    }
}

xhr.send();