let todos = [
    {
        title: "Do Homework",
        completedStatus: false,
        //category: ["DGM3760", "School"]
    },
    {
        title: "Walk the dog",
        completedStatus: false,
        //category: "Home"
    },
    {
        title: "Push code",
        completedStatus: true,
        //category: "Work"
    }
]

let todoList = document.querySelector('ul')
let pendingTasks = document.getElementById('pendingTasks')

//Display todo list
function myTodoList(){
    todoList.innerHTML = ''
    todos.forEach((todo, index) => {
    let li = document.createElement('li')
    li.innerHTML = `${todo.title} <i class="fa-solid fa-check"></i>`
    if (todo.completedStatus) {
        li.classList.add('completed')
        li.style.textDecoration = 'line-through';
        
    }
    //Edit button for each task
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit Task';
    editButton.addEventListener('click', () => editTodo(index))

    li.appendChild(editButton)

    li.addEventListener('click', () => toggleComplete(index));
    todoList.appendChild(li)
})
    updatePendingTasks();
}


//Pending Tasks
function updatePendingTasks() {
    const pendingCount = todos.filter(todo => !todo.completedStatus).length
    pendingTasks.textContent = `You have ${pendingCount} incomplete tasks`
}

//Toggle completed tasks
function toggleComplete(index) {
    todos[index].completedStatus = !todos[index].completedStatus;
    myTodoList();
}
function pushTodo() {
    const todoTitle = document.getElementById('todo').value;
    if (todoTitle.trim() !== '') {
        const newTodo = {
            title: todoTitle,
            completedStatus: false,
        }
        todos.push(newTodo)
        document.getElementById('todo').value = '';
        myTodoList()
    } else {
        alert('Please add a new task')
    }
}

function editTodo(index) {
    const newTitle = prompt('Edit task:', todos[index].title);
    if (newTitle !== null) {
        todos[index].title = newTitle;
        myTodoList();
    }
}

//Clear out completed todos
function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completedStatus);
    myTodoList()
}

document.getElementById('addTodo').addEventListener('click', pushTodo)
document.getElementById('clearDoneTodo').addEventListener('click', clearCompletedTodos)

myTodoList()