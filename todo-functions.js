'use strict'

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON !== null ? JSON.parse(todosJSON) : []

    } catch (e) {
        return []
    }

}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const toggleTodo = function(id, isChecked) {

    todos.forEach( function(todo) {
        if (todo.id === id && isChecked) {
            todo.isCompleted = isChecked
            hideTodos(todos,filters)
        } else if (todo.id === id && !isChecked) {
            todo.isCompleted = isChecked
        }
    })
    saveTodos(todos)
    getSummaryDOM(todos)


}

const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter( function(todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    const todosContainer = document.querySelector('#render-todos')
    todosContainer.innerHTML = ''

    getSummaryDOM(filteredTodos)
    generateTodoDOM(filteredTodos, todosContainer)
}

const removeTodo = (id) => {
    todos.forEach( function(todo, index) {
        if (todo.id === id) {
            todos.splice(index, 1)
        }
    })
    hideTodos(todos,filters)
}

const generateTodoDOM = (filteredTodos, todosContainer) => {
    filteredTodos.forEach( function(todo) {
        const todoElement = document.createElement('label')
        const containerElement = document.createElement('div')
        todosContainer.appendChild(todoElement)

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        containerElement.appendChild(checkbox)
        checkbox.checked = todo.isCompleted

        checkbox.addEventListener('change', function(e) {

            toggleTodo(todo.id, e.target.checked)
        })


        const todoText = document.createElement('span')
        todoText.textContent = todo.text
        containerElement.appendChild(todoText)

        todoElement.classList.add('list-item')
        containerElement.classList.add('list-item__container')
        todoElement.appendChild(containerElement)

        const removeButton = document.createElement('button')
        removeButton.textContent = 'remove'
        removeButton.classList.add('button', 'button--text')
        todoElement.appendChild(removeButton)

        removeButton.addEventListener('click', function() {
            removeTodo(todo.id)
            saveTodos(todos)
            renderTodos(todos,filters)
            hideTodos(todos,filters)
        })




    })
}

const getSummaryDOM = (todos) => {

    let title = document.querySelector('#summary')

    const incompletedTodos = todos.filter( function(todo) {
        return !todo.isCompleted
    })

    if (incompletedTodos.length === 1) {
        title.textContent = `You have ${incompletedTodos.length} To-Do incompleted`
    } else if (incompletedTodos.length > 1) {
        title.textContent = `You have ${incompletedTodos.length} To-Dos incompleted`
    }else {
        title.textContent = `You have nothing to do. Try finding something!`
    }


}

const hideTodos = (todos, filters) =>  {

    if (filters.hideCompleted) {

        const todosContainer = document.querySelector('#render-todos')
        todosContainer.innerHTML = ''

        const filteredTodos = todos.filter( function(todo) {
            if (todo.isCompleted === false) {
                return todo
            }

        })
        
        generateTodoDOM(filteredTodos, todosContainer)

    } else {
        renderTodos(todos, filters)
    }
}

