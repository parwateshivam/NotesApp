// global declarations
let taskArray = JSON.parse(localStorage.getItem("data")) || [];
let editIndex = null;

// HTML elements
let taskForm = document.getElementById("task-form");
let closePopup = document.getElementById("close-popup");
let openPopup = document.getElementById("open-popup");
let searchBar = document.getElementById("search-bar");

// class toggler function
function toggleClass(event) {
  let target = document.querySelector(event.target.dataset.targetElement);
  if (target) {
    target.classList.toggle(event.target.dataset.toggleClass);
  }
}

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
      taskArray[editIndex].category = event.target["category"].value;
      taskArray[editIndex].timeStamp = `Time : ${new Date().toLocaleTimeString()} Date : ${new Date().toLocaleDateString()}`
      editIndex = null;
    }
    // creating new task 
    else {
      let newTask = {
        title: event.target["title"].value,
        description: event.target["description"].value,
        category: event.target["category"].value,
        timeStamp: `Time : ${new Date().toLocaleTimeString()} Date : ${new Date().toLocaleDateString()}`
      };
      taskArray.push(newTask);
    }
    event.target["title"].value = "";
    event.target["description"].value = "";
    event.target["category"].value = "";
    closePopup.click();
    displayTask(taskArray);
    saveData(taskArray);
  } catch (err) {
    console.log("please add task before submitting !", err);
  }
});

// displaying the task one by one
function displayTask(arrayToBeDisplayed) {
  if (arrayToBeDisplayed.length === 0) {
    document.getElementById("task-msg").innerText = "No Data to Display !";
  } else {
    document.getElementById("task-msg").innerText = "All tasks";
  }
  let taskContainer = document.querySelector('.tasks-container');
  taskContainer.innerHTML = "";
  arrayToBeDisplayed.forEach((task, index) => {
    let div = document.createElement("div");
    div.classList.value = "border p-3 d-flex flex-column";
    div.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>
      <div class="d-flex gap-1">
       <p>Category :</p>
       <p>${task.category}</p>
      </div>
      <span class="timeStamp">${task.timeStamp}</span>
      <div class="d-flex gap-3 p-2">
       <button class="btn btn-info" onClick='editTask(${index})'>Edit</button>
       <button class="btn btn-danger" onClick='deleteTask(${index})'>Delete</button>
      </div>`;
    taskContainer.appendChild(div);
  });
}

// delete task
function deleteTask(deleteIndex) {
  let permission = window.confirm(`do you really want to delete this task ?`);
  if (permission) {
    taskArray = taskArray.filter((task, taskIndex) => {
      return taskIndex != deleteIndex;
    })
    saveData(taskArray);
    displayTask(taskArray);
  }
}

// edit task
function editTask(editTaskIndex) {
  document.getElementById("title").value = (taskArray[editTaskIndex].title);
  document.getElementById("description").value = (taskArray[editTaskIndex].description);
  editIndex = editTaskIndex;
  openPopup.click();
}

// return task based on search value
searchBar.addEventListener("change", (event) => {
  let searchValue = event.target.value;
  event.target.value = "";
  let filteredArray = taskArray.filter((task, index) => {
    if (task.title.includes(searchValue) || task.description.includes(searchValue) || task.timeStamp.includes(searchValue)) {
      return task;
    }
  });
  displayTask(filteredArray);
});


function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

displayTask(taskArray);



















































