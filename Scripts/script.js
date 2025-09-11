function changeMode(event){
  let target = document.querySelector(event.target.dataset.targetMaincontainer);
  if(target){
    target.classList.toggle(event.target.dataset.toggleMode);
  }
}

function hideShow(event) {
  let target = document.querySelector(event.target.dataset.targetPopup);
  if (target) {
    target.classList.toggle(event.target.dataset.togglePopup);
  }
}

// HTML elements
let taskForm = document.getElementById("task-form");
let closePopup = document.getElementById("close-popup");
let openPopup = document.getElementById("open-popup");

// global declarations
let taskArray = [];
let editIndex = null;

// after removing mouse from form-pop-up this will executes and submit the form
document.querySelector(".add-notes-form").addEventListener("mouseleave", () => {
  document.getElementById("formSubmitButton").click();
});

// this will executes after submitting the form
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    if (!event.target['title'].value || !event.target['description'].value) {
      throw ("empty fields !");
    }
    // for editing exitsing task from taskArray
    if (editIndex !== null) {
      taskArray[editIndex].title = event.target["title"].value;
      taskArray[editIndex].description = event.target["description"].value;
      taskArray[editIndex].timeStamp = `Time : ${new Date().toLocaleTimeString()} Date : ${new Date().toLocaleDateString()}`
      editIndex = null;
    }
    // creating new task 
    else {
      let newTask = {
        title: event.target["title"].value,
        description: event.target["description"].value,
        timeStamp: `Time : ${new Date().toLocaleTimeString()} Date : ${new Date().toLocaleDateString()}`
      };
      taskArray.push(newTask);
    }
    event.target["title"].value = "";
    event.target["description"].value = "";
    closePopup.click();
    displayTask();
  } catch (err) {
    console.log("please add task before submitting !", err);
  }
});

// displaying the task one by one
function displayTask() {
  let taskContainer = document.querySelector('.tasks-container');
  taskContainer.innerHTML = "";
  taskArray.forEach((task, index) => {
    let singleTask = document.createElement("div");
    singleTask.classList.value = "border p-4 rounded shadow";
    singleTask.innerHTML = `
      <h4 class="title">${task.title}</h4>
      <p class="description">${task.description}</p>
      <span class="timeStamp">${task.timeStamp}</span>
      <button class="btn btn-info" onClick='editTask(${index})'>Edit</button>
      <button class="btn btn-danger" onClick='deleteTask(${index})'>Delete</button>`;
    taskContainer.appendChild(singleTask);
  });
}

// delete task
function deleteTask(deleteIndex) {
  let permission = window.confirm(`do you really want to delete this task ?`);
  if (permission) {
    taskArray = taskArray.filter((task, taskIndex) => {
      return taskIndex != deleteIndex;
    })
    displayTask();
  }
}

// edit task
function editTask(editTaskIndex) {
  document.getElementById("title").value = (taskArray[editTaskIndex].title);
  document.getElementById("description").value = (taskArray[editTaskIndex].description);
  editIndex = editTaskIndex;
  openPopup.click();
}




















































