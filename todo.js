let inputArea = document.querySelector("input");
let addBtn = document.querySelector("#addBtn");
let checkbox = document.querySelectorAll(".checkbox");
let displayList = document.querySelector("#list");
let deleteBtn = document.querySelector(".fa-trash");
let sortBtn = document.querySelector(".sort_btn");
let allBtn = document.querySelector("#all_item");
let completeBtn = document.querySelector("#completed_item");
let incompleteBtn = document.querySelector("#incomplete_item");
let dotoEx1 = new NewItem("buy flower", 1, 1);
let dotoEx2 = new NewItem("learn React", 0, 2);
let dotoEx3 = new NewItem("make dinner", 0, 3);
let todoArr = [dotoEx1, dotoEx2, dotoEx3];
let todoHtml = "";
let currentPage = 1; // 1: all, 2: complete, 3: incomplete

function NewItem(content, status, id) {
  this.content = content;
  this.status = status;
  this.id = id;
}

function setStorage() {
  // 若沒東西，就放todoArr進去
  if (!localStorage.getItem("todoArray")) {
    localStorage.setItem("todoArray", JSON.stringify(todoArr));
  }
}

function addBtnMouseDownEffect() {
  $("#addBtn").removeClass("add_btn");
  $("#addBtn").addClass("add_btn_clicked");
}

function addBtnMouseUpEffect() {
  $("#addBtn").removeClass("add_btn_clicked");
  $("#addBtn").addClass("add_btn");

  // $("#addBtn").trigger("click");
}

function addTodo() {
  if (inputArea.value !== "") {
    todoArr = JSON.parse(localStorage.getItem("todoArray")); // 從local storage拿到todo list，賦予給todoArr
    let newTodoItem = new NewItem(inputArea.value, 0, Date.now()); // new an item
    todoArr.push(newTodoItem); // 把new item放到todoArr
    console.log(todoArr);
    localStorage.setItem("todoArray", JSON.stringify(todoArr)); // 把todoArr放到localStorage
    $("input").val(""); // clear input

    $("#all_item").trigger("click");
  }
}

function displayTodos() {
  todoHtml = "";
  // 從local storage拿到todo list並轉為物件格式
  let todoArray = JSON.parse(localStorage.getItem("todoArray"));
  // console.log(todoArray);

  // display the array
  for (i = 0; i < todoArray.length; i++) {
    if (todoArray[i].status === 0) {
      todoHtml += `
      <div class="item_wrapper" id=${todoArray[i].id}>
       <div class="check_text">
      <div class="checkbox"><i class="fas fa-check  hide_check"></i></div>
      <div class="item">${todoArray[i].content}</div>
      </div>
      <div class="delete"><i class="fas fa-trash"></i></div>
      </div>`;
    } else {
      todoHtml += `
      <div class="item_wrapper" id=${todoArray[i].id}>
      <div class="check_text">
      <div class="checkbox_checked"><i class="fas fa-check"></i></div>   
      <div class="item">${todoArray[i].content}</div>
      </div>
      <div class="delete"><i class="fas fa-trash"></i></div>
      </div>`;
    }
  }

  displayList.innerHTML = todoHtml;

  $(".checkbox").click(handleCheck);
  $(".checkbox_checked").click(handleCheck);
  $(".delete").click(deleteItem);

  currentPage = 1;
}

function handleCheck() {
  let todoArray = JSON.parse(localStorage.getItem("todoArray"));
  let thisId = $(this).parent().parent().attr("id"); // 得到選取item的id
  let checkedItem = todoArray.find((item) => item.id == thisId); // 找array裡id符合的
  console.log(checkedItem);
  if (checkedItem.status === 0) {
    checkedItem.status = 1; // 改變為完成狀態
    localStorage.setItem("todoArray", JSON.stringify(todoArray)); // 更新狀態到local storage
    $(this).removeClass("checkbox").addClass("checkbox_checked");
    $(this).children().removeClass("hide_check");
  } else {
    checkedItem.status = 0; // 改變未完成狀態
    localStorage.setItem("todoArray", JSON.stringify(todoArray)); // 更新狀態到local storage
    $(this).removeClass("checkbox_checked").addClass("checkbox");
    $(this).children().addClass("hide_check");
  }
}

function deleteItem() {
  let todoArray = JSON.parse(localStorage.getItem("todoArray"));
  let thisId = $(this).parent().attr("id"); // 得到選取item的id
  let thisStatus = $(this).parent().attr("id");
  $(this).children().css("color", "#d3d3d3");
  $(this).removeClass("delete").addClass("delete_clicked");

  setTimeout(() => {
    // todoArray = todoArray.filter((item) => item.id !== thisId); // 找array裡id符合的
    todoArray = todoArray.filter((item) => item.id != thisId); // 找array裡id符合的
    console.log(todoArray);
    localStorage.setItem("todoArray", JSON.stringify(todoArray));

    if (currentPage === 1) {
      displayTodos();
    } else if (currentPage === 2) {
      displayCompleted();
    } else {
      displayIncomplete();
    }
  }, 200);
}

function displayCompleted() {
  todoHtml = "";
  // 從local storage拿到todo list並轉為物件格式
  let todoArray = JSON.parse(localStorage.getItem("todoArray"));
  // console.log(todoArray);
  todoArray = todoArray.filter((item) => item.status === 1);
  console.log(todoArray);

  // display the array
  for (i = 0; i < todoArray.length; i++) {
    todoHtml += `
      <div class="item_wrapper" id=${todoArray[i].id}>
      <div class="check_text">
      <div class="checkbox_checked"><i class="fas fa-check"></i></div>   
      <div class="item">${todoArray[i].content}</div>
      </div>
      <div class="delete"><i class="fas fa-trash"></i></div>
      </div>`;
  }

  displayList.innerHTML = todoHtml;

  $(".checkbox").click(handleCheck);
  $(".checkbox_checked").click(handleCheck);
  $(".delete").click(deleteItem);

  currentPage = 2;
}

function displayIncomplete() {
  todoHtml = "";
  // 從local storage拿到todo list並轉為物件格式
  let todoArray = JSON.parse(localStorage.getItem("todoArray"));
  // console.log(todoArray);
  todoArray = todoArray.filter((item) => item.status === 0);
  console.log(todoArray);

  // display the array
  for (i = 0; i < todoArray.length; i++) {
    todoHtml += `
      <div class="item_wrapper" id=${todoArray[i].id}>
       <div class="check_text">
      <div class="checkbox"><i class="fas fa-check  hide_check"></i></div>
      <div class="item">${todoArray[i].content}</div>
      </div>
      <div class="delete"><i class="fas fa-trash"></i></div>
      </div>`;
  }

  displayList.innerHTML = todoHtml;

  $(".checkbox").click(handleCheck);
  $(".checkbox_checked").click(handleCheck);
  $(".delete").click(deleteItem);

  currentPage = 3;
}

function changeSortBtnStyle() {
  $(this).addClass("current_sort");
  $(this).siblings().removeClass("current_sort");
}

setStorage();
displayTodos();

addBtn.addEventListener("click", addTodo);
addBtn.addEventListener("mousedown", addBtnMouseDownEffect);
allBtn.addEventListener("click", displayTodos);
completeBtn.addEventListener("click", displayCompleted);
incompleteBtn.addEventListener("click", displayIncomplete);
document.querySelector("body").addEventListener("mouseup", addBtnMouseUpEffect);
$(".sort_btn").click(changeSortBtnStyle);
