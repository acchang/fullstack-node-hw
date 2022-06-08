const http = require('http')
const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(`<h2>Phonebook has info for ${persons.length} people</h2>
    <h2>${currentDate}</h2>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

response.status(204).end()
})

const generateId = () => {
    const randomId = persons.length > 0
    ? Math.random(1000)
    //   ? Math.max(...persons.map(n => n.id))
      : 0
    return randomId
}
  

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    
      const person = {
        name: body.name,
        number: body.number || null,
        id: generateId(),
      }
    
      persons = persons.concat(person)
    
      response.json(person)
    })
//     const person = request.body
//     person.id = randomId
//     console.log(person)

//     person = persons.concat(person)

//     response.json(person)

//   })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)