let todos = [
    {
        title: "Do Homework",
        completedStatus: false,
        category: "DGM3760"
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
//Displaying Todos Start

//Display todo list
function myTodoList(categoryFilter) {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        // Check if the category matches the selected filter or if no filter is applied
        if (!categoryFilter || (Array.isArray(todo.category) && todo.category.includes(categoryFilter)) || todo.category === categoryFilter) {
            let li = document.createElement('li');
            li.innerHTML = `<span style="font-size:15px; font-style: italic;">${todo.category}</span> : ${todo.title} <i class="fa fa-check"></i>`;
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

//New function that will allow user to create a new task and give it a category
function addNewTodo() {
    const todoName = prompt('Enter Todo Name:');
    if (todoName !== null && todoName.trim() !== '') {
        const todoCategory = prompt('Enter Todo Category');
        if (todoCategory !== null) {
            const newTodo = {
                title: todoName,
                completedStatus: false,
                category: todoCategory
            }
            todos.push(newTodo);
            displayCategoryList();
            categoryOptions();
            myTodoList();
        }
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
    displayCategoryList();
    categoryOptions();
    myTodoList();
}

//Display todos End

//Category Filtering Start
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
//Category Filtering End

//Display, Edit and Delete All Categories Start
function displayCategoryList() {
    const categoryEditingList = document.getElementById('categoryEditingList');

    // Clear existing content
    categoryEditingList.innerHTML = '';

    // Create a list element for each category
    todos.forEach(todo => {
        if (Array.isArray(todo.category)) {
            todo.category.forEach(category => {
                const listItem = document.createElement('div');
                listItem.className = 'category-list-item';

                const categoryName = document.createElement('span');
                categoryName.textContent = category;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editCategory(category, prompt('Enter new category name:', category)));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteCategory(category));

                listItem.appendChild(categoryName);
                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);

                categoryEditingList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('div');
            listItem.className = 'category-list-item';

            const categoryName = document.createElement('span');
            categoryName.textContent = todo.category;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editCategory(todo.category, prompt('Enter new category name:', todo.category)));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteCategory(todo.category));

            listItem.appendChild(categoryName);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);

            categoryEditingList.appendChild(listItem);
        }
    });
}

// Function to edit a category
function editCategory(oldCategory, newCategory) {
    todos.forEach(todo => {
        if (Array.isArray(todo.category)) {
            const index = todo.category.indexOf(oldCategory);
            if (index !== -1) {
                todo.category[index] = newCategory;
            }
        } else {
            if (todo.category === oldCategory) {
                todo.category = newCategory;
            }
        }
    });
    displayCategoryList(); // Update the category list after editing
    myTodoList(); // Refresh the todo list
    categoryOptions();

}

// Function to delete a category
function deleteCategory(categoryToDelete) {
    todos.forEach(todo => {
        if (Array.isArray(todo.category)) {
            const index = todo.category.indexOf(categoryToDelete);
            if (index !== -1) {
                todo.category.splice(index, 1);
            }
        } else {
            if (todo.category === categoryToDelete) {
                todo.category = "No Category";
            }
        }
    });
    displayCategoryList(); // Update the category list after deleting
    myTodoList(); // Refresh the todo list
    categoryOptions();

}


// Call the function to initially display the categories
displayCategoryList();

//Display, Edit and Delete All Categories End


const newTodoButton = document.getElementById('addNewTodo')
newTodoButton.addEventListener('click', addNewTodo)
document.getElementById('clearDoneTodo').addEventListener('click', clearCompletedTodos)

myTodoList()