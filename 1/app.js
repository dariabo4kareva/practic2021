const buttonEnter = document.getElementById('enter')
const userInput = document.getElementById('userInput')
const ul = document.querySelector('ul')

function inputLength() {
    return userInput.value.length > 0
}

function createTodo() {
    const li = document.createElement('li')
    li.innerHTML = userInput.value;
    ul.appendChild(li)
    userInput.value = ''

    function done() {
        li.classList.toggle('done')
    }

    li.addEventListener('click', done)

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-times"></i>'
    li.appendChild(deleteButton)
    deleteButton.addEventListener('click', deleteToDoItem)

    function deleteToDoItem() {
        ul.removeChild(li)
    }
}

function changeListAfterKeypress(event) {
    if (inputLength() && event.which == 13) {
        createTodo()
    }
}

function changeListAfterClick() {
    if (inputLength()) {
        createTodo()
    }
}

userInput.addEventListener('keypress', changeListAfterKeypress)
buttonEnter.addEventListener('click', changeListAfterClick)

    function done() {
        todoElem.classList.toggle('done')
    }
