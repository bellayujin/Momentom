const todoForm = document.querySelector('.js_todoForm'),
    todoInput = todoForm.querySelector('input'),
    todoList = document.querySelector('.js_todoList');

const TODOS_LS = 'toDos';

let toDos = [];

let idNumbers = 1;

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
};

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = idNumbers;
    idNumbers += 1
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    toDos.push(todoObj);
    saveTodos();
};

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
};

function loadToDos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if (loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        });
    }
};

function init(){
    loadToDos();
    todoForm.addEventListener('submit', handleSubmit);
};

init();