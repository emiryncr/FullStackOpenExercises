const express = require('express');
const morgan = require('morgan');
//const cors = require('cors'); // Uncomment if you want to use CORS, no need for CORS in this case as the frontend is served from the same origin
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
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id)
    if(person) {
        res.json(person);
    }else{
        res.status(404).send({ error: 'Person not found' });
    }
})

app.get('/api/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`);
})

app.delete('/api/persons/:id',(req, res) => {
    const id = req.params.id;
    const personIndex = persons.findIndex(p => p.id === id);
    if(personIndex !== -1) {
        //persons.splice(personIndex, 1);
        res.send({ message: `Person with id ${id} deleted` });
        res.status(204).end();
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;
    if(!newPerson.name || !newPerson.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }
    if(persons.find(p => p.name === newPerson.name)) {
        return res.status(400).json({ error: 'Name must be unique' });
    }
    newPerson.id = (Math.random() * 10000).toFixed(0);
    persons.push(newPerson);
    res.status(201).json(newPerson);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});