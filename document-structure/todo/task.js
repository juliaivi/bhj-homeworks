const taskInput = document.getElementById("task__input");
const tasksAdd = document.getElementById('tasks__add');
const tasksList = document.getElementById("tasks__list");
let taskRemove = document.querySelectorAll(".task__remove");

let task;

let mus = []
let statusInit = initUserTaskList()
let count;

if(!statusInit) {
    alert("Error bliat'")
}

tasksAdd.addEventListener("click", (event) => {
    addText(event, mus);
})

drawTasks(mus)

tasksList.addEventListener("click", removeTask)

function initUserTaskList() {
    let userTasks;

    if (localStorage.length === undefined || localStorage.length === 0) {
        return false;
    }

    let key = localStorage.getItem("key");
    if (key === "" || key === null || key === undefined) {
        return false
    }

    userTasks = JSON.parse(key);

    if (userTasks === null || userTasks === undefined) {
        return false
    }

    mus = userTasks;

    return true
}

function drawTasks(tasks) {
    if (tasks == null || tasks == undefined) {
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        task = document.createElement("div");
        task.dataset.id = i;
        task.className = 'task';
        task.innerHTML = `
            <div class="task__title">
                ${tasks[i]}
            </div>
            <a href="#" class="task__remove">&times;</a>
        `;
        tasksList.appendChild(task);
    }
}

function addText(event, mus) {
    event.preventDefault();

    if (!taskInput.value.trim()) {
        return;
    }
    
    mus.push(taskInput.value);
    let musLength = mus.length-1;
    task = document.createElement("div");
    task.dataset.id = musLength;
    task.className = 'task';
   
    task.innerHTML = `
        <div class="task__title">
            ${taskInput.value}
        </div>
        <a href="#" class="task__remove">&times;</a>
        `; 
   
    tasksList.appendChild(task);
    
    taskInput.value = "";
    console.log(mus)
    let val = JSON.stringify(mus)
    localStorage.setItem("key", val)
}

function removeTask(event) {
    let task =  event.target.closest(".task");
    let taskDataId = task.dataset.id;
         
    task.remove();
    mus.splice(taskDataId, 1)
    
    localStorage.setItem("key", JSON.stringify(mus));
}






