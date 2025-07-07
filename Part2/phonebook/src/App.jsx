import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('Data fetched from server:', initialPersons);
      })
  }

  useEffect(hook, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
    console.log(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
    console.log(e.target.value);
  }
  
  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, dou you want to update it with new number?`);
      if(confirmUpdate) {
        const personToUpdate = persons.find(p => p.name === newName);
        const changedPerson = {...personToUpdate, number: newNumber};
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log('Person updated:', returnedPerson);
        })
        .catch(error => {
          console.log('Error updating person:', error);
          setNotification(`Information of ${newName} has already been removed from server`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          
          setPersons(persons.filter(p => p.id !== changedPerson.id))
          console.log(`Removed person with id ${changedPerson.id} from state due to server error.`);
        })
      }
      return;
    } else if (newName === '' || newNumber === '') {
      alert('Name and number cannot be empty')
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    }

    personService
      .create(personObject)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log('Person added:', returnedPerson);
        setNotification(`Added ${returnedPerson.name}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    console.log(e.target.value);
  }

  const filteredPersons = persons.filter(person => {
    return (person.name || '').toLowerCase().includes(filter.toLowerCase())
  })

  const deletePerson = (id) => { 
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification(`Deleted ${person.name}`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          console.log(`Deleted person with id ${id}`);
        })
        .catch(error => {
          console.log('Error deleting person:', error);
          setNotification(`Information of ${person.name} has already been removed from server`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
          console.log(`Removed person with id ${id} from state due to server error.`);
        })
    }
   }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} notificationType={notificationType} />
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <p>Filter shown with <input value={filter} onChange={handleFilterChange} /></p>
      </div>
        <div>
          <ul>
            <Persons persons={filteredPersons} deletePerson={deletePerson} />
          </ul>
        </div>
    </div>
  )
}

export default App
