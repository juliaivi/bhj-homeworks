let items = document.getElementById("items");
let loader = document.getElementById("loader");

let mus = [];
let data;
let statusInit = initValute();


let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.addEventListener("readystatechange", showQuery);
xhr.send();

function initValute() {
    let valute = localStorage.getItem('valuet');
    if (valute == "" || valute == null || valute == undefined) {
        return false;
    }

    data = JSON.parse(valute);

    if (data ==  undefined || data == null) {
        return false;
    }

    mus = data;

    if (mus !== 0) {
        loader.classList.remove('loader_active');
    }

    createValut();
    return true;
}

function valueData(elem) {
    for (let value in elem) {
        mus.push({
            charCode: elem[value].CharCode,
            value: elem[value].Value,
        })
    }
}

function createValut() {
    for (let i = 0; i < mus.length; i++) {
        let item = `<div class="item">
                    <div class="item__code">
                        ${mus[i].charCode}
                    </div>
                    <div class="item__value">
                        ${mus[i].value}
                    </div>
                    <div class="item__currency">
                        руб.
                    </div>
                </div>`;

        items.insertAdjacentHTML("beforeend", item);
    }
}
  
function showQuery() {
    if (xhr.readyState === xhr.DONE) {
        loader.classList.remove('loader_active');

        if (localStorage.length !== 0) {
            localStorage.remove();
            mus = [];
        }
        
        data = JSON.parse(xhr.responseText).response.Valute;
        
        valueData(data);
        createValut();
            
        console.log(mus);
        localStorage.setItem("valuet", JSON.stringify(mus));
    }
}