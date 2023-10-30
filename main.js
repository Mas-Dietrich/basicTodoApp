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
            // Edit icon for each task
            const editIcon = document.createElement('i');
            editIcon.classList.add('fa', 'fa-pencil', 'edit-icon')
            editIcon.addEventListener('click', () => editTodo(index));

            li.appendChild(editIcon);

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
const todoForm = document.getElementById('todoForm')
const newTaskNameInput = document.getElementById('newTaskName')
const newTaskCategoryInput = document.getElementById('newTaskCategory')

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = newTaskNameInput.value;
    const taskCategory = newTaskCategoryInput.value;

    if (taskName.trim() !== '') {
    
        // Create a new todo object
        const newTodo = {
            title: taskName,
            completedStatus: false,
            category: taskCategory
        };

        // Add the new todo to the todos array
        todos.push(newTodo);

        // Clear input fields
        newTaskNameInput.value = '';
        newTaskCategoryInput.value = '';

        // Update the todos and categories
        myTodoList();
        displayCategoryList()
        categoryOptions()
    }
});

/*function addNewTodo() {
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
} */

function editTodo(index) {
    const newTitle = prompt('Edit task:', todos[index].title);
    if (newTitle !== null) {
        const updateCategory = confirm('Do you want to update the category for this task?');
        if (updateCategory) {
            const newCategory = prompt('Enter the new category:', todos[index].category);
            todos[index].category = newCategory;
        }
        todos[index].title = newTitle;
        myTodoList();
        displayCategoryList();
        categoryOptions();
    }
}

//Clear out completed todos
function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completedStatus);
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
    // Check if the new category name already exists
    if (newCategory === oldCategory || !categoryExists(newCategory)) {
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
    } else {
        alert(`Category "${newCategory}" already exists. Please choose a different name.`);
    }
}

// Function to check if a category name already exists
function categoryExists(categoryName) {
    return todos.some(todo => {
        return Array.isArray(todo.category) ? todo.category.includes(categoryName) : todo.category === categoryName;
    });
}

// Function to delete a category
function deleteCategory(categoryToDelete) {
    if (hasAssociatedTasks(categoryToDelete)) {
        alert(`Category "${categoryToDelete}" cannot be deleted until you complete its tasks.`);
    } else {
        todos = todos.map(todo => {
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
            return todo;
        });
        displayCategoryList();
        myTodoList();
        categoryOptions();
    }
}

function hasAssociatedTasks(categoryName) {
    return todos.some(todo => {
        return Array.isArray(todo.category) ? todo.category.includes(categoryName) : todo.category === categoryName;
    });
}


// Call the function to initially display the categories
displayCategoryList();

//Display, Edit and Delete All Categories End



document.getElementById('clearDoneTodo').addEventListener('click', clearCompletedTodos)

myTodoList()

//Potential Update: Instead of having string categories, categorize todos by numbers that are connected to an array of objects with id's and category names