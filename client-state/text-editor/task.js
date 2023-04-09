let editor = document.getElementById('editor');
let clearEditor = document.querySelector(".clear__editor");

window.addEventListener("unload", editorValue);
clearEditor.addEventListener("click", removeEditor);

geteditorValue();

function geteditorValue() {
    editor.value = localStorage.getItem("editor");   
}

function editorValue() {
    localStorage.setItem("editor", editor.value);
}

function removeEditor() {
    editor.value = "";
    localStorage.removeItem("editor");
}