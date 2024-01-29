const form = document.querySelector('form')
const name = form.name
const number = form.number
const auto = form.auto
const cancelBtn = document.querySelector('#cancel')
const saveBtn = document.querySelector('#save')
const addBtn = document.querySelector('#add')
const button = document.querySelector('button')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')
let tableRow = ''

addBtn.addEventListener('click', test)
tbody.addEventListener('click', deleteRow)
tbody.addEventListener('click', editRow)
saveBtn.addEventListener('click', saveRow)
cancelBtn.addEventListener('click', cancelChanges)

function test(event) {

  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  const json = JSON.stringify(data)
  let eventTr = ''


  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json,
  }
  fetch('/', init)
    .then(() => {
      location.reload()
    })
}

function deleteRow(event) {
  if (event.target.matches('button')) {
    const tr = event.target.closest('tr')
    const init = {
      method: 'DELETE',
      body: String(tr.rowIndex - 1)
    }
    fetch('/', init)
      .then(() => {
        location.reload()
      })
  }
}

function editRow(event) {
  if (!event.target.matches('button')) {
    const tr = event.target.closest('tr')
    tableRow = tr.rowIndex - 1

    form.name.value = tr.cells[0].textContent
    form.number.value = tr.cells[1].textContent
    form.auto.value = tr.cells[2].textContent

    tr.style = 'background: red;'
    saveBtn.style = "display: block;"
    cancelBtn.style = "display: block;"
    button.style = "display: none;"

    fetch('/', init)
      .then(() => {
        location.reload()
      })
  }
}

function saveRow(event) {
  const formData = new FormData(form)
  // console.log(formData)

  const updateData = {
    name: form.name.value,
    number: form.number.value,
    auto: form.auto.value,
    index: tableRow
  }
  let updateDataJson = JSON.stringify(updateData)
  
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: updateDataJson,
  }
  fetch('/api/endpoint1', init)
  .then(() => {
    location.reload()
  })
}

function cancelChanges() {
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }

  fetch('/', init)
  .then(() => {
    location.reload()
  })
}



