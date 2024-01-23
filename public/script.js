const form = document.querySelector('form')
const name = form.name
const number = form.number
const auto = form.auto
const button = document.querySelector('button')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')

button.addEventListener('click', test)
tbody.addEventListener('click', deleteRow)

function test(event) {

  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  const json = JSON.stringify(data)

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

// function render(responseData) {
//   console.log('Response from server:', responseData);
// }
