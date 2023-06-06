import * as variable from "./variables.js";

let draggableItem = null;

export const dragStart = function () {
  draggableItem = this;
};

export const dragEnd = function () {
  draggableItem = null;
};

export const dragOver = function (e) {
  e.preventDefault();
};

export const dragEnter = function () {
  this.style.border = "1px solid black";
  this.style.background = "rgba(50, 67, 95, 0.2)";
};

export const dragLeave = function () {
  this.style.border = "none";
  this.style.background = "none";
};

export const dragDrop = function () {
  this.style.border = "none";
  this.style.background = "none";
  this.appendChild(draggableItem);

  const currentStatus = draggableItem.querySelector("#status-info").textContent;
  const newStatus = this.querySelector("#status-info").textContent;

  //update first local storage array (where we drop task)
  const title_ = draggableItem.querySelector("#title-info").textContent;
  const description_ = draggableItem.querySelector("#description-info").textContent;
  const status_ = newStatus;
  let arr = JSON.parse(localStorage.getItem(newStatus));
  let newElement = { title: title_, description: description_, status: status_ };
  arr.push(newElement);
  localStorage.setItem(newStatus, JSON.stringify(arr));

  //update local storage from which we drag task
  let arr2 = JSON.parse(localStorage.getItem(currentStatus));
  const taskToDelete = draggableItem.querySelector("#title-info").textContent;
  let index = arr2.findIndex((p) => p.title == taskToDelete);
  arr2.splice(index, 1);
  localStorage.setItem(currentStatus, JSON.stringify(arr2));
};
