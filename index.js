const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('combined'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is running on port 3001');
});

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  res.send('Person deleted');
});

const newID = () => {
  return persons.length === 0 ? 0 : persons.length + 1;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Entry needs name and number.',
    });
  } else if (persons.some((person) => person.name === body.name)) {
    return res.status(400).json({
      error: 'Name must be unique.',
    });
  }

  const person = {
    id: newID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});