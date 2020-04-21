import React, { useState } from 'react'
import Filter from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
        name: newName,
        number: newNumber
    }

    persons.map(person => person.name).includes(newName)
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)    
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)    
  }

  const personsToShow = persons.filter(
      person => person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} handleChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm
            name={newName} number={newNumber} 
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            addPerson={addPerson}/>

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App