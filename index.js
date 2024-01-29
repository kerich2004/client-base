const http = require('http');
const fs = require('fs');
const { text } = require('stream/consumers');
let replaceMarkup = ''
let data = []

const port = 47080;

http.createServer((request, response) => {
  const url = request.url
  
  if (request.url == '/api/endpoint1') {
    let postData = ''
    let formIndex = ''
    let postDataObj = ''
    let index = ''
    request.on('data', (chunk) => {
      postData += chunk
      postDataObj = JSON.parse(postData)
    })
    request.on('end', () => {
      index = postDataObj.index
      data[index] = postDataObj
      response.end()
    })
  }

  else if (request.method == 'POST') {
    let body = ''


    request.on('data', (chunk) => body += chunk)
    request.on('end', () => response.end(data.push(JSON.parse(body)) + ''))
  }


  else if (request.method == 'DELETE') {
    let i = ''

    request.on('data', (chunk) => {
      i += chunk
      data.splice(i, 1)
      response.end()
    })
  }

  else {
    try {
      const path = url.slice(1) || 'index.html';
      let fileContent = fs.readFileSync('./public/' + path, 'utf-8')

      if (path == 'index.html') {
        let html = ''

        for (const person of data) {
          html += `
            <tr>
              <td>${person.name}</td>
              <td>${person.number}</td>
              <td>${person.auto}</td>
              <td><button>&times;</button></td>
            </tr>
          `
        }

        replaceMarkup = fileContent.replace('#', html)

        response.end(replaceMarkup)
      } else {
        response.end(fileContent)
      }
    }
    catch (error) {
      writeHead(404)
      console.log(error)
    }
  }
}).listen(port)
