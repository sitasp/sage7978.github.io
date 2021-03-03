//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //Prevent button from submitting
    event.preventDefault()

    //Todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");


    //Create Li
    const newTodo = document.createElement("li");
    if(todoInput.value.length == 0){
        return;
    }
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //checkmark
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)

    //delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appending tododiv to todolist
    todoList.appendChild(todoDiv);




    //clear todo input value
    todoInput.value = "";
}


function deleteCheck(e) {
    const item = e.target;

    //Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }


    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        updateLocalTodos(todo);
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}




function saveLocalTodos(todo) {
    //check --do i have any thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    var arr = [todo,0];
    todos.push(arr);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    //check --do i have any thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todos);
    var parsedTodo = JSON.parse(localStorage.getItem("todos"));
    parsedTodo.forEach(function (todo) {
        //Todo div
        const todoDiv = document.createElement("div")

        //Create Li
        if(todo[1]==0){
            todoDiv.classList.add("todo");
            const newTodo = document.createElement("li");
            newTodo.innerText = todo[0];
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
        }
        else if (todo[1]==1){
            var name = "todo completed";
            todoDiv.className = name;
            const newTodo = document.createElement("li");
            newTodo.innerText = todo[0];
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
        }

        //checkmark
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton)

        //delete button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //appending tododiv to todolist
        todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo) {
    //check --do i have any thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    //todos.splice(todos.indexOf(todoIndex), 1)
    
    //Finding the index of todo-content to todos
    let indexFound = -1;
    let cnt = 0;
    for (let ar of todos) {
        //console.log(ar[0]);
        //console.log(todoIndex);
        if (ar[0] == todoIndex) {
            indexFound = cnt;
            break;
        }
        cnt = cnt + 1;
    }
    //console.log(indexFound);
    todos = deleteRow(todos, indexFound+1)
    //console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function deleteRow(arr, row) {
    arr = arr.slice(0); // make copy
    arr.splice(row - 1, 1);
    //console.log("reaching");
    return arr;
}

function updateLocalTodos(todo){
   // console.log(todo);
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
   // console.log(todoIndex);

   //Finding the index of todo-content to todos
    let indexFound = -1;
    let cnt = 0;
    for(let ar of todos){
        //console.log(ar[0]);
        //console.log(todoIndex);
        if (ar[0]==todoIndex){
            indexFound = cnt;
            break; 
        }
        cnt = cnt + 1;
    }
    //console.log(indexFound);
    todos[indexFound][1]=1;
    localStorage.setItem("todos", JSON.stringify(todos));
}