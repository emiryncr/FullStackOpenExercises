require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person')
//const cors = require('cors'); // Uncomment if you want to use CORS, no need for CORS in this case as the frontend is served from the same origin
//const mongoose = require('mongoose');
const app = express();
//app.use(cors());
app.use(express.static('dist'))

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Phonebook API</h1>');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id).then(person => {
        if(person) {
            res.json(person);
        } else {
            res.status(404).send({ error: 'Person not found' });
        }
    });
});

app.get('/api/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`);
})

app.delete('/api/persons/:id',(req, res) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id).then(() => {
        res.status(204).end();
    });
});

app.get('/api/info', (req, res) => {
    Person.countDocuments().then(count => {
        res.send(`Phonebook has info for ${count} people <br><br> ${new Date()}`);
    });
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })

});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});