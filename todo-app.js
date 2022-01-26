'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',

    hideCompleted: false
}


renderTodos(todos,filters)

document.querySelector('#todo-input').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)

})

document.querySelector('#todos-form').addEventListener('submit', function(e) {
    e.preventDefault()
    let inputValue = e.target.elements.newTodo.value.trim()

    if (inputValue.length > 0) {
        
        todos.push({
            id: uuidv4(),
            text: inputValue,
            isCompleted: false
        })

    } else {
        alert('Please add text content to the ToDo')
    }

    saveTodos(todos)
    renderTodos(todos, filters)
    hideTodos(todos,filters)
    
    e.target.elements.newTodo.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked

    hideTodos(todos, filters)
})