// Add task to local storage
let addBtn = document.getElementById("newSubmit");
addBtn.addEventListener("click", function (e) {

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
    //   console.log(taskObj);
    showTasks();
});

// Function to show elements from localStorage
function showTasks() {
    let tasksLi = localStorage.getItem("tasks");
    if (tasksLi == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasksLi);
    }
    let html = "";
    taskObj.forEach(function (element, index) {
        html += `

        <li>
            
                <div class="task">
                    <div class="num">
                        <div>${index + 1}</div>
                    </div>
                    <div class="content">
                        <input type="text" id="field" class="text" value="${element.name}" readonly>
                    </div>

                    <div class="date">
                        <input type="date" id="fieldD" class="date" readonly value="${element.date}">
                    </div>

                    <div class="actions">
                        <button id="${index}"onclick="editTask(this.id)" class="edit">Edit</button>
                        <button id="${index}"onclick="deleteTask(this.id)" class="delete">Delete</button>
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

// Function to delete a task
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

// Function to Edit the task
function editTask(index) {
    console.log(index);
    let tasksLi = localStorage.getItem("tasks");
    let editTask = document.getElementById("field");
    let editDate = document.getElementById("fieldD");    
    let editState = document.getElementById(index);
    
    console.log(editState);

    

    if (editState.innerText.toLowerCase() == "edit") {
        console.log("made it 1");
        editState.innerText = "Save";
        console.log(editState);
        editTask.removeAttribute("readonly");
        editTask.className = "text-edit";
        editTask.focus();
        editDate.removeAttribute("readonly");
    } else {
        console.log("made it 2");
        editState.innerText = "Edit";
        editTask.setAttribute("readonly", "readonly");
        editTask.className = "text";
        console.log(editTask.innerHTML);
        editDate.setAttribute("readonly", "readonly");
        editTask = document.getElementById("field");
        editDate = document.getElementById("fieldD");

        let editObj = {
            name: editTask.value,
            date: editDate.value
        }
        taskObj.splice(index, 1);
        taskObj.push(editObj);
        localStorage.setItem("tasks", JSON.stringify(taskObj));
        showTasks();


    }

}


showTasks();
