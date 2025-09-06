/// Variable  to store todo items
let todoList = [];

function validateInput(event) {
    if (event) event.preventDefault(); // agar form tidak reload

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
        status: 'Pending', // Default status
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

function showFilterOptions() {
    const filterDiv = document.getElementById('filter-options');
    if (filterDiv.innerHTML.trim() === "") {
        filterDiv.innerHTML = `
            <button class="bg-gray-500 text-white px-4 py-2" onclick="filterTodo('pending')">Show Pending</button>
            <button class="bg-green-500 text-white px-4 py-2" onclick="filterTodo('done')">Show Done</button>
            <button class="bg-blue-500 text-white px-4 py-2" onclick="renderTodoList()">Show All</button>
        `;
    } else {
        filterDiv.innerHTML = "";
    }
}

function filterTodo(status) {
    const todoTableBody = document.querySelector('#todo-table tbody');
    todoTableBody.innerHTML = '';

    // Filter todo sesuai status, simpan juga index asli
    const filteredList = todoList
        .map((item, idx) => ({ ...item, originalIndex: idx }))
        .filter(item => {
            if (status === 'pending') return !item.completed;
            if (status === 'done') return item.completed;
            return true;
        });

    if (filteredList.length === 0) {
        todoTableBody.innerHTML = `
            <tr>
                <td class="border px-4 py-2" colspan="5">No Tasks found.</td>
            </tr>
        `;
    } else {
        filteredList.forEach((item, index) => {
            todoTableBody.innerHTML += `
                <tr>
                    <td class="border px-4 py-2">${index + 1}</td>
                    <td class="border px-4 py-2">${item.task}</td>
                    <td class="border px-4 py-2">${item.dueDate}</td>
                    <td class="border px-4 py-2">${item.completed ? '<span class="text-green-600 font-bold">Done</span>' : '<span class="text-yellow-600 font-bold">Pending</span>'}</td>
                    <td class="border px-4 py-2">
                        <button onclick="toggleStatus(${item.originalIndex})" class="bg-green-500 text-white px-2 py-1 rounded mr-2">&#10003;</button>
                        <button onclick="deleteTodo(${item.originalIndex})" class="bg-red-500 text-white px-2 py-1 rounded">&#10005;</button>
                    </td>
                </tr>
            `;
        });
    }
}

// Fungsi untuk render todo list ke dalam tabel
function renderTodoList () {

    // Render ke TABLE
    const todoTableBody = document.querySelector('#todo-table tbody');
    todoTableBody.innerHTML = '';

    if (todoList.length === 0) {
        todoTableBody.innerHTML = `
            <tr>
                <td class="border px-4 py-2" colspan="5">No Tasks added yet.</td>
            </tr>
        `;
    } else {
        todoList.forEach((item, index) => {
            todoTableBody.innerHTML += `
                <tr>
                    <td class="border px-4 py-2">${index + 1}</td>
                    <td class="border px-4 py-2">${item.task}</td>
                    <td class="border px-4 py-2">${item.dueDate}</td>
                    <td class="border px-4 py-2">${item.completed ? '<span class="text-green-600 font-bold">Done</span>' : '<span class="text-yellow-600 font-bold">Pending</span>'}</td>
                    <td class="border px-4 py-2">
                        <button onclick="toggleStatus(${index})" class="bg-green-500 text-white px-2 py-1 rounded mr-2">&#10003;</button>
                        <button onclick="deleteTodo(${index})" class="bg-red-500 text-white px-2 py-1 rounded">&#10005;</button>
                    </td>
                </tr>
            `;
        });
    }
}

// Fungsi untuk toggle status Pending/Done
function toggleStatus(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
}

// Fungsi untuk hapus satu todo
function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}