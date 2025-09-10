function hideShow(event) {
  let target = document.querySelector(event.target.dataset.targetPopup);
  if (target) {
    target.classList.toggle(event.target.dataset.togglePopup);
  }
}

let taskForm = document.getElementById("task-form");
let closePopup = document.getElementById("close-popup");

let taskArray = [];

document.querySelector(".add-notes-form").addEventListener("mouseleave", () => {
  document.getElementById("formSubmitButton").click();
  closePopup.click();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    if (!event.target['title'].value || !event.target['description'].value) {
      throw ("empty fields !");
    }
    let newTask = {
      title: event.target["title"].value,
      description: event.target["description"].value,
      timeStamp: `Time : ${new Date().toLocaleTimeString()} Date : ${new Date().toLocaleDateString()}`
    };
    event.target["title"].value = "";
    event.target["description"].value = "";
    closePopup.click();
    taskArray.push(newTask);
    displayTask();
  } catch (err) {
    console.log("please add task before submitting !", err);
  }
});

function displayTask() {
  let taskContainer = document.querySelector('.tasks-container');
  taskContainer.innerHTML = "";
  taskArray.forEach((task) => {
    let singleTask = document.createElement("div");
    singleTask.classList.value = "task border p-4";
    singleTask.innerHTML = `
      <h4 class="title">${task.title}</h4>
      <p class="description">${task.description}</p>
      <span class="timeStamp">${task.timeStamp}</span>`;
    taskContainer.appendChild(singleTask);
  });
}
























































