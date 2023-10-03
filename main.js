let todos = [
    {
        title: "Do Homework",
        completedStatus: false,
        category: ["DGM3760", "School"]
    },
    {
        title: "Walk the dog",
        completedStatus: false,
        category: "Home"
    },
    {
        title: "Push code",
        completedStatus: true,
        category: "Work"
    }
]

let todoList = document.querySelector('ul')
let pendingTasks = document.getElementById('pendingTasks')

//Display todo list
function myTodoList(categoryFilter) {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        // Check if the category matches the selected filter or if no filter is applied
        if (!categoryFilter || (Array.isArray(todo.category) && todo.category.includes(categoryFilter)) || todo.category === categoryFilter) {
            let li = document.createElement('li');
            li.innerHTML = `${todo.title} <i class="fa fa-pencil"></i>`;
            if (todo.completedStatus) {
                li.classList.add('completed');
                li.style.textDecoration = 'line-through';
            }
            // Edit button for each task
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit Task';
            editButton.addEventListener('click', () => editTodo(index));

            li.appendChild(editButton);

            li.addEventListener('click', () => toggleComplete(index));
            todoList.appendChild(li);
        }
    });
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
    //const selectedCategory = document.getElementById('categorySelect').value;
    if (todoTitle.trim() !== '') {
        const newTodo = {
            title: todoTitle,
            completedStatus: false,
            //category: selectedCategory,
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

//TODO:

//Users need to be able to view todos by category
function categoryOptions() {
    const categorySelect = document.getElementById('categoryFilter')
    const uniqueCategories = new Set()

    todos.forEach(todo => {
        if(Array.isArray(todo.category)) {
            todo.category.forEach(category => {
                uniqueCategories.add(category)
            })
        } else {
            uniqueCategories.add(todo.category)
        }
    })

    categorySelect.innerHTML = '';

    const allCategoriesOption = document.createElement('option')
    allCategoriesOption.value = '';
    allCategoriesOption.textContent = 'All Categories';
    categorySelect.appendChild(allCategoriesOption)

    uniqueCategories.forEach(category => {
        const option = document.createElement ('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option)
    })
}

categoryOptions();

const categorySelect = document.getElementById('categoryFilter')
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    myTodoList(selectedCategory)
})

//Allow users to create new categories
function addCategory() {
    const newCategoryInput = document.getElementById('newCategory')
    const newCategory = newCategoryInput.value.trim();

    if (newCategory !== '') {
        const categoryExists = Array.from(document.getElementById('categoryFilter').options).some(option => option.value === newCategory)

        if (!categoryExists) {
            const categorySelect = document.getElementById('categoryFilter')
            const option = document.createElement('option')
            option.value = newCategory
            option.textContent = newCategory
            categorySelect.appendChild(option)

            newCategoryInput.value = '';
        } else {
            alert("Category Already Exists")
        }
    }
}

//Allow users to select a category when adding new todos

//Users need to be able to delete categories

//Users need to be able to edit current categories ( and update all existing todos with the edited category )

document.getElementById('addTodo').addEventListener('click', pushTodo)
document.getElementById('clearDoneTodo').addEventListener('click', clearCompletedTodos)
document.getElementById('addCategory').addEventListener('click', addCategory)

myTodoList()