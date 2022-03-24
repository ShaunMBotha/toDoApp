//Add task

let addBtn = document.getElementById("newSubmit");
addBtn.addEventListener("click", (e) => {

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
        date: addDate.value
    }

    taskObj.push(myObj);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    addDate.value = "";
    addTask.value = "";
    
    showTasks();
});

// Poppulate page with tasks
function showTasks() {

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
                        <button id="${index}"onclick="editTask(${index})" class="edit">Edit</button>
                        <button id="${index}"onclick="deleteTask(${index})" class="delete">Delete</button>
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
}

// Delete Function
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

// Edit Function
function editTask(index) {
    
    let tasksLi = localStorage.getItem("tasks");
    let editTask = document.getElementById("field".concat(index));
    let editDate = document.getElementById("fieldD".concat(index));
    let editState = document.getElementById(index);
    
    let editTaskObj = JSON.parse(tasksLi);

    if (editState.innerText.toLowerCase() == "edit") {
        editState.innerText = "Save";
        editTask.removeAttribute("readonly");
        editTask.className = "text-edit";
        editTask.focus();
        editDate.removeAttribute("readonly");
    } else {
        editState.innerText = "Edit";
        editTask.setAttribute("readonly", "readonly");
        editTask.className = "text";
        editDate.setAttribute("readonly", "readonly");
        editTask = document.getElementById("field".concat(index));
        editDate = document.getElementById("fieldD".concat(index));
       
        editTaskObj [index] = {
            name: editTask.value,
            date: editDate.value
        }
        
        localStorage.setItem("tasks", JSON.stringify(editTaskObj));
        showTasks();


    }

}

showTasks();
