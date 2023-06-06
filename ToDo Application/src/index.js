import * as variable from "./variables.js";
import * as func from "./utility_functions.js";
import * as dragndrop from "./drag_and_drop.js";

variable.addNewTask.addEventListener("click", function () {
  variable.newTask.classList.remove("task--hidden");
});

variable.buttonClose.addEventListener("click", function () {
  variable.newTask.classList.add("task--hidden");
});

//saveTask only save the new DOM element and display it
variable.buttonSave.addEventListener("click", function () {
  func.saveTask();
  func.applyUtilityFunctions();
});

window.addEventListener("load", function () {
  //get data from local storage everytime when we load the page
  func.getAllDataFromLocalStorage();
  func.applyUtilityFunctions();
});
