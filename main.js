showTasks();

//Add task

let subBtn = document.getElementById("newSubmit");
subBtn.addEventListener("click", (e) => {

    let addTask = document.getElementById("newTask");
    let addDate = document.getElementById("newDate");
    

    if (addTask.value == "" || addDate.value == "") {
        return alert("Fill both the Task Description and the Due Date")
    }

    let tasksLi = localStorage.getItem("tasks");
    if (tasksLi == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasksLi);
    }
    let myObj = {
        name: addTask.value,
        date: addDate.value,
        
    }

    taskObj.push(myObj);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    addDate.value = "";
    addTask.value = "";


    showTasks();
});

// Poppulate page with tasks
function showTasks() {

    //Tasks section

    let tasksLi = localStorage.getItem("tasks");

    if (tasksLi == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasksLi);
    }

    let html = "";

    taskObj.forEach((element, index) => {
        html += `

        <li>
            
                <div class="task">
                    <div class="num">
                        <div>${index + 1}</div>
                    </div>
                    <div class="content">
                        <input type="text" id="field${index}" class="text" value="${element.name}" readonly>
                    </div>

                    <div class="date">
                        <input type="date" id="fieldD${index}" class="date" readonly value="${element.date}">
                    </div>

                    <div class="actions">
                        <button id="edit${index}"onclick="editTask(${index})" class="edit">Edit</button>
                        <button id="complete${index}"onclick="completeTask(${index})" class="complete">Complete</button>
                    </div>
                </div>
            
        </li>

            `;
    });

    let taskElm = document.getElementById("tasks");

    if (taskObj.length != 0) {
        taskElm.innerHTML = html;
    } else {
        taskElm.innerHTML = `No tasks available, add new tasks above.`;
    }

    //Completed Task section---------------------------------------------------------------------------------------

    let cTasksLi = localStorage.getItem("c-tasks");

    if (cTasksLi == null) {
        cTaskObj = [];
    } else {
        cTaskObj = JSON.parse(cTasksLi);
    }

    let cHtml = "";

    cTaskObj.forEach((element, cIndex) => {
        cHtml += `

        <li>
            
                <div class="c-task">
                    <div class="num">
                        <div>${cIndex + 1}</div>
                    </div>
                    <div class="content">
                        <input type="text" id="cField${cIndex}" class="text" value="${element.name}" readonly>
                    </div>

                    <div class="date">
                        <input type="date" id="cFieldD${cIndex}" class="date" readonly value="${element.date}">
                    </div>

                    <div class="actions">
                        <button id="undo${cIndex}"onclick="undoTask(${cIndex})" class="undo">Undo</button>
                        <button id="cD${cIndex}"onclick="cDeleteTask(${cIndex})" class="delete">Delete</button>
                    </div>
                </div>
            
        </li>

            `;
    });

    let cTaskElm = document.getElementById("c-task");

    if (cTaskObj.length != 0) {
        cTaskElm.innerHTML = cHtml;
    } else {
        cTaskElm.innerHTML = `No Completed tasks available, complete tasks above.`;
    }

}

// Complete Task Function
function completeTask(index) {

    let cTasksLi = localStorage.getItem("c-tasks");
    if (cTasksLi == null) {
        cTaskObj = [];
    } else {
        cTaskObj = JSON.parse(cTasksLi);
    }

    localStorage.setItem("c-tasks", JSON.stringify(cTaskObj));
    showTasks();

    let tasksLi = localStorage.getItem("tasks");

    tasksLi = JSON.parse(tasksLi);
    cTasksLi = JSON.parse(cTasksLi);

    let cTask = tasksLi[index].name;
    let cDate = tasksLi[index].date;

    myCTaskObj = {
        name: cTask,
        date: cDate
    }

    cTaskObj.push(myCTaskObj);
    taskObj.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    localStorage.setItem("c-tasks", JSON.stringify(cTaskObj));
    showTasks();

}

// Undo complete task Function
function undoTask(index) {

    let tasksLi = localStorage.getItem("tasks");
    if (tasksLi == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasksLi);
    }

    localStorage.setItem("tasks", JSON.stringify(taskObj));
    showTasks();

    let cTasksLi = localStorage.getItem("c-tasks");
    
    console.log(cTasksLi);

    cTasksLi = JSON.parse(cTasksLi);
    tasksLi = JSON.parse(tasksLi);
    
    let task = cTasksLi[index].name;
    let date = cTasksLi[index].date;

    myTaskObj = {
        name: task,
        date: date
    }

    taskObj.push(myTaskObj);
    cTaskObj.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    localStorage.setItem("c-tasks", JSON.stringify(cTaskObj));
    showTasks();

}


// Delete Functions
function deleteTask(index) {

    let confirmDel = confirm("Delete this task?");

    if (confirmDel == true) {

        let tasksLi = localStorage.getItem("tasks");
        if (tasksLi == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(tasksLi);
        }

        taskObj.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(taskObj));
        showTasks();
    }
}

function cDeleteTask(index) {

    let confirmDel = confirm("Delete this completed task?");

    if (confirmDel == true) {

        let cTasksLi = localStorage.getItem("c-tasks");
        if (cTasksLi == null) {
            cTaskObj = [];
        } else {
            cTaskObj = JSON.parse(cTasksLi);
        }

        cTaskObj.splice(index, 1);
        localStorage.setItem("c-tasks", JSON.stringify(cTaskObj));
        showTasks();
    }
}

// Edit Function
function editTask(index) {

    let tasksLi = localStorage.getItem("tasks");
    let editTask = document.getElementById("field".concat(index));
    let editDate = document.getElementById("fieldD".concat(index));
    let editState = document.getElementById("edit".concat(index));
    let editCom = document.getElementById("complete".concat(index));

    let editTaskObj = JSON.parse(tasksLi);

    if (editState.innerText.toLowerCase() == "edit"){

        editState.innerText = "Save";
        editTask.removeAttribute("readonly");
        editTask.className = "text-edit";
        editDate.removeAttribute("readonly");
        editCom.innerText = "Delete";
        editCom.removeAttribute("onclick");
        editCom.setAttribute("onclick", "deleteTask(".concat(index).concat(");"));
        editTask.focus();

    } else {

        editState.innerText = "Edit";
        editTask.setAttribute("readonly", "readonly");
        editTask.className = "text";
        editDate.setAttribute("readonly", "readonly");
        editCom.innerText = "Complete";
        editTask = document.getElementById("field".concat(index));
        editDate = document.getElementById("fieldD".concat(index));

        editTaskObj[index] = {
            name: editTask.value,
            date: editDate.value
        }

        localStorage.setItem("tasks", JSON.stringify(editTaskObj));
        showTasks();

    }
}

showTasks();
