export const newTask = document.querySelector(".task");
export const editTask = document.querySelector(".edit-task");
export const TaskModal = document.querySelector(".task-modal");
export const addNewTask = document.querySelector(".add-task");
export const saveChanges = document.querySelector(".save-all");

export const contentTasks = document.querySelector(".content__tasks");

export const title = document.querySelector("#title");
export const description = document.querySelector("#description");
export const titleEdit = document.querySelector("#title-edit");
export const descriptionEdit = document.querySelector("#description-edit");
export const titleInfo = document.querySelector("#title-info");
export const descriptionInfo = document.querySelector("#description-info");
export const buttonSave = document.querySelector(".add-task--modal");
export const buttonClose = document.querySelector(".add-task--close");
export const buttonEditClose = document.querySelector(".add-task--save-close");
export const buttonCloseInfo = document.querySelector(".add-task--close-info");

export const container1 = document.querySelector(".show-task--1");
export const container2 = document.querySelector(".show-task--2");
export const container3 = document.querySelector(".show-task--3");
export const containers = document.querySelector(".show-task");
export const columns = document.querySelectorAll(".column"); //dropable

export const checkboxChoice1 = document.querySelector("#toDo");
export const checkboxChoice2 = document.querySelector("#inProgress");
export const checkboxChoice3 = document.querySelector("#done");

export const choice1 = checkboxChoice1.checked && !checkboxChoice2.checked && !checkboxChoice3.checked;
export const choice2 = !checkboxChoice1.checked && checkboxChoice2.checked && !checkboxChoice3.checked;
export const choice3 = !checkboxChoice1.checked && !checkboxChoice2.checked && checkboxChoice3.checked;
