$(function () {
  const buttonEnter = $('#enter')
  const userInput = $('#userInput')
  const ul = $('ul')

  const items = JSON.parse(localStorage.getItem('todos') || '[]');

  function saveItems() {
    localStorage.setItem('todos', JSON.stringify(items))
  }

  function addItem(text) {
    const item = {
      id: Date.now(),
      text,
      done: false,
    };

    items.push(item);
    saveItems();

    return item;
  }

  function removeItem(id) {
    const idx = items.findIndex(i => i.id === id)

    if (idx > -1) {
      items.splice(idx, 1)
    }

    saveItems();
  }

  function toggleItem(id) {
    const idx = items.findIndex(i => i.id === id)

    if (idx > -1) {
      items[idx].done = !items[idx].done;
    }

    saveItems();
  }
  function createItemDOM(item) {
    const id = item.id;
    const li = $('<li>')
    const date = new Date(item.id);

    const text = item.text;
    li.html("<span>" + text + "</span><span class='d'>" + "</span>");
    li.html();
    ul.append(li)

    li.click(function () {
      toggleItem(id)
      $(this).toggleClass('done')
    })

    if (item.done) {
      li.toggleClass('done')
    }

    const deleteButton = $('<button>')
    deleteButton.html('x')
    li.append(deleteButton)
    deleteButton.click(function () {
      li.animate(
        {
          'margin-left': '100px',
          'margin-right': '100px'
        }, { duration: 10000, queue: false }
      ).fadeOut(1000);
      removeItem(id);
    })
  }

  function renderItems() {
    ul.html('');

    items.forEach((i) => {
      createItemDOM(i)
    });
  }

  function inputLength() {
    return userInput.val().length > 0
  }

  function createTodo() {
    const item = addItem(userInput.val())
    createItemDOM(item);
    userInput.val('')
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

  userInput.keypress(changeListAfterKeypress)
  buttonEnter.click(changeListAfterClick);

  function zero_first_format(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }

  function date_time() {
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth() + 1);
    var year = current_datetime.getFullYear();
    return day + "." + month + "." + year;
  }

  setInterval(function () {
    document.getElementById('current_date_block').innerHTML = date_time();
  }, 1000);

  renderItems();
});