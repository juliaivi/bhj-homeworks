let progress = document.getElementById('progress');
let form = document.getElementById('form');
let file = document.getElementById('file');

form.addEventListener("submit", changeValue);

function changeValue(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = uploadProgress;
        
    function uploadProgress(event) {
        progress.value = (event.loaded / event.total).toFixed(2);   
    }

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formData);
}

