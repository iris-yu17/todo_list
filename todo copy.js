let itemEx1 = new todoItem("buy flower", 0, 1);
let itemEx2 = new todoItem("meet iris", 0, 2);

let todoList = [itemEx1, itemEx2];
let addBtn = document.querySelector("#addBtn");
let testBtn = document.querySelector("#test");
let displayList = document.querySelector("#list");

function todoItem(content, status, id) {
  this.content = content;
  // status: 0 undone, 1 done
  this.status = status;
  this.id = id;
}

function addNewTodo() {
  let inputText = document.querySelector("input").value;
  let item = new todoItem(inputText, 0, Date.now()); // a new todo item

  todoList.push(item); // add the new todo into array

  $("input").val(""); // clear input
  console.log(todoList);

  displayTodo();
}

function displayTodo() {
  let todoHtml = "";
  for (i = 0; i < todoList.length; i++) {
    todoHtml += `
    <input type="checkbox" class="checkbox" id=${todoList[i].id} >
    <div class="testtest">${todoList[i].content}</div>`;
  }

  displayList.innerHTML = todoHtml;
}

displayTodo();


$(".testtest").click(function () {
  console.log("click");
});

addBtn.addEventListener("click", addNewTodo, false);
testBtn.addEventListener("click", test, false);



