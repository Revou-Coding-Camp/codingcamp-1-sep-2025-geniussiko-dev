/// Variable  to store todo items
let todoList = [];

function validateInput() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDateInput = document.getElementById('todo-date-input').value;

    if (todoInput === '' || todoDateInput === '') {
        alert('Please fill in both the task and the due date.');
    } else {
        addTodo(todoInput, todoDateInput);
    }

    console.log("Todo Input:", todoInput);
    console.log("Todo Date Input:", todoDateInput);
}

function addTodo (todo, dueDate) {
    // Add the new todo item to the list
    const todoItem = {
        task: todo,
        dueDate: dueDate,
        completed: false
    };

    // Push the new todo item to the todoList array
    todoList.push(todoItem);
    // Re-render the todo list
    renderTodoList();
}

function deleteAllTodo () {
    // Clear the todo list Array
    todoList = [];
    // Re-render the todo list
    renderTodoList();
}

function filterTodo () {

}

function renderTodoList () {
    //Code to render the todo list in the HTML
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';

    // Loop through the todoList array and create HTML elements for each item
    todoList.forEach((item, index) => {
        todoListContainer.innerHTML += `
        <P>${item.task} - Due: ${item.dueDate}</P>
        `;
    });
}