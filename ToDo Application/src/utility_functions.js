import * as variable from "./variables.js";
import * as dragndrop from "./drag_and_drop.js";

//---------CREATING NEW ELEMENT------------------//
//template string
const returnTemplateString = function (taskTitle, taskDescription, checkboxChoice) {
  return `<div class="main-container" draggable="true">
  <div class="show-task__content">
  <p id="task-title">${taskTitle}</p>
</div>
<div id="edit-task">
  EDIT 
</div>
<div id="delete-buttons">
  DELETE
</div>
<div class="task-modal task-modal--hidden">
<p id="information">TASK INFO</p>
<p id='para'>Status:</p>
<p id="status-info">${checkboxChoice}</p>
<p id='para'>Title:</p>
<p id='title-info'>${taskTitle}</p>
<p id='para'>Description:</p>
<p id='description-info'>${taskDescription}</p>
<button class="add-task add-task--close-info">Close</button>
</div></div>`;
};

//filling containers with appropriate template string
export const saveTask = function () {
  //if TO DO option is checked, fill container 1
  if (variable.checkboxChoice1.checked && !variable.checkboxChoice2.checked && !variable.checkboxChoice3.checked) {
    variable.container1.innerHTML += returnTemplateString(
      variable.title.value,
      variable.description.value,
      variable.checkboxChoice1.value
    );
    sendToLocalStorage(variable.container1, "TODO");
  }

  //if IN PROGRESS option is checked,fill container 2
  if (!variable.checkboxChoice1.checked && variable.checkboxChoice2.checked && !variable.checkboxChoice3.checked) {
    variable.container2.innerHTML += returnTemplateString(
      variable.title.value,
      variable.description.value,
      variable.checkboxChoice2.value
    );
    sendToLocalStorage(variable.container2, "PROGRESS");
  }

  //if DONE option is checked, fill container 3
  if (!variable.checkboxChoice1.checked && !variable.checkboxChoice2.checked && variable.checkboxChoice3.checked) {
    variable.container3.innerHTML += returnTemplateString(
      variable.title.value,
      variable.description.value,
      variable.checkboxChoice3.value
    );
    sendToLocalStorage(variable.container3, "DONE");
  }

  variable.title.value = "";
  variable.description.value = "";
};

//-------DISPLAYING TASKS INFORMATION-------------//
const showTaskDetails = function (container) {
  const tasksArr = container.querySelectorAll(".main-container");
  tasksArr.forEach((element) => {
    const taskContent = element.querySelector(".show-task__content");
    const taskModal = element.querySelector(".task-modal");
    const closeTaskModal = element.querySelector(".add-task--close-info");
    taskContent.addEventListener("click", function () {
      taskModal.classList.remove("task-modal--hidden");
      closeTaskModal.addEventListener("click", function () {
        taskModal.classList.add("task-modal--hidden");
      });
    });
  });
};

//-------------LOCAL STORAGE------------------------/////
const sendToLocalStorage = function (container, key) {
  const tasksArr = container.querySelectorAll(".main-container");
  const localStorageArray = [];
  let taskObject = {};
  for (let i = 0; i < tasksArr.length; i++) {
    const taskTitle = tasksArr[i].querySelector("#title-info").textContent;
    const taskDescription = tasksArr[i].querySelector("#description-info").textContent;
    const taskStatus = tasksArr[i].querySelector("#status-info").textContent;
    taskObject = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };
    localStorageArray.push(taskObject);
  }
  localStorage.setItem(key, JSON.stringify(localStorageArray));
};

const getfromLocalStorage = function (container, key) {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData) {
    let arr = [];
    arr = JSON.parse(localStorageData);
    arr.forEach((element) => {
      const taskTitle = element.title;
      const taskDescription = element.description;
      const taskStatus = element.status;
      container.innerHTML += returnTemplateString(taskTitle, taskDescription, taskStatus);
    });
  }
};

export const getAllDataFromLocalStorage = function () {
  getfromLocalStorage(variable.container1, "TODO");
  getfromLocalStorage(variable.container2, "PROGRESS");
  getfromLocalStorage(variable.container3, "DONE");
};

//---------------EDIT TASK---------------///
const editTask = function (key, container) {
  let arr = [];
  let arr2 = [];
  arr = JSON.parse(localStorage.getItem(key));
  const buttonsArray = container.querySelectorAll("#edit-task");
  const task = container.querySelectorAll(".main-container");

  for (let i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].addEventListener("click", function () {
      //open modal window
      variable.editTask.classList.remove("edit-task--hidden");

      //update local storage array with new data
      variable.buttonEditClose.addEventListener("click", function () {
        arr[i].title = variable.titleEdit.value + " (edited)";
        arr[i].description = variable.descriptionEdit.value;
        localStorage.setItem(key, JSON.stringify(arr));
        variable.editTask.classList.add("edit-task--hidden");
      });
    });
  }
};

//---------------DELETE TASK---------------///
const deleteTask = function (key, container) {
  let arr = [];
  arr = JSON.parse(localStorage.getItem(key));
  const task = container.querySelectorAll(".main-container");
  const buttonsArray = container.querySelectorAll("#delete-buttons");
  const titleTask = container.querySelectorAll("#title-info");
  for (let i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].addEventListener("click", function () {
      //remove DOM element
      task[i].remove();
      //update local storage array
      const taskToDelete = titleTask[i].textContent;
      let index = arr.findIndex((p) => p.title == taskToDelete);
      arr.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(arr));
    });
  }
};

const applyDragAndDrop = function () {
  //select all tasks from all columns
  const draggableItems = document.querySelectorAll(".main-container");
  const columns = document.querySelectorAll(".show-task");

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", dragndrop.dragStart);
    item.addEventListener("dragend", dragndrop.dragEnd);
  });

  columns.forEach((col) => {
    col.addEventListener("dragover", dragndrop.dragOver);
    col.addEventListener("dragenter", dragndrop.dragEnter);
    col.addEventListener("dragleave", dragndrop.dragLeave);
    col.addEventListener("drop", dragndrop.dragDrop);
  });
};

export const applyUtilityFunctions = function () {
  //apply displaying tasks for all three containers
  showTaskDetails(variable.container1);
  showTaskDetails(variable.container2);
  showTaskDetails(variable.container3);

  //apply editing for all three containers
  editTask("TODO", variable.container1);
  editTask("PROGRESS", variable.container2);
  editTask("DONE", variable.container3);

  //apply deletion for all three containers
  deleteTask("TODO", variable.container1);
  deleteTask("PROGRESS", variable.container2);
  deleteTask("DONE", variable.container3);

  applyDragAndDrop();
};
