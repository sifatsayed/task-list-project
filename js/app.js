let  form = document.querySelector("#task_form");
let taskInput = document.querySelector("#new_task");
let filter = document.querySelector("#task_filter");
let clearBtn = document.querySelector("#clear_task_btn");
let taskList = document.querySelector("ul");

// Define Event listener 
form.addEventListener("submit", addTask);
taskList.addEventListener("click",removeTask);
clearBtn.addEventListener("click",clearTask)
filter.addEventListener("keyup" , filterTask);
document.addEventListener("DOMContentLoaded", getTasks)


// Define Function 
// add Task
function addTask(e) {
   if (taskInput.value === "") {
       alert("Please Add Your Task")
   } else {
       let li = document.createElement("li");
       li.appendChild(document.createTextNode(taskInput.value + "  "));
       let link = document.createElement("a");
       link.setAttribute("href" ,"#");
       link.innerText = " x";
       li.appendChild(link)
       taskList.appendChild(li);

       // store task in local Storage 
       storeTaskInLocalStorage (taskInput.value)
       taskInput.value = ""
   }
    e.preventDefault();
};


// Remove task
function removeTask (e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure to remove it")) {
            let ele = e.target.parentElement
            ele.remove();
            
            // remove from Local Storage 
            removeFromLS (ele)
        }
        
    }
   
};


// clear all the task 
function clearTask () {
    taskList.innerHTML = "";
    localStorage.clear();
};

// filter the task list 
function filterTask (e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent ;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block" ;
        } else {
            task.style.display = "none"
        }
    })
};


// Store In Local storage 
function storeTaskInLocalStorage (task) {
    let tasks 
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Loaded the dom content from Local Storage 
function getTasks () {
    let tasks 
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement("a");
        link.setAttribute("href" ,"#");
        link.innerText = " x";
        li.appendChild(link)
        taskList.appendChild(li);
    })
};

// Remove From Local Storage 
function removeFromLS (taskItem) {
    let tasks ;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    let li = taskItem ;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index , 1)
        } 
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}