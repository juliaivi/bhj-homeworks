const taskInput = document.getElementById("task__input");
const tasksAdd = document.getElementById('tasks__add');
const tasksList = document.getElementById("tasks__list");

tasksList.innerHTML = localStorage.getItem("key");
const tasks = document.querySelectorAll(".task");

let task;

function addText(event) {
    event.preventDefault();

    if (!taskInput.value.trim()) {
        return;
    }

    task = document.createElement("div");
    task.className = 'task';
    task.innerHTML = `
        <div class="task__title">
            ${taskInput.value}
        </div>
        <a href="#" class="task__remove">&times;</a>
     `; 
    tasksList.appendChild(task);

    localStorage.setItem("key", tasksList.innerHTML); 
}

 function removeText(elem) {
    elem.querySelector(".task__remove").addEventListener("click", () => {
        elem.remove();  
        localStorage.setItem("key", tasksList.innerHTML);    
    })
}

tasksAdd.addEventListener("click", (event) => {
    addText(event);  
    removeText(task);   
})

for (let task of tasks) {
    task.querySelector('.task__remove').addEventListener('click', () =>  {
        task.remove();
        localStorage.setItem("key", tasksList.innerHTML);
    })
}







