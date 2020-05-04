import React, { useState, useEffect, useLayoutEffect } from 'react'
import Filter from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])


  const addPerson = event => {
    event.preventDefault()

    if (newName !== '' && persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePerson()
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = () => {
    //console.log(`replacing ${newName}`);

    const person = persons.find(p => p.name === newName)
    person.number = newNumber

    personService.update(person.id, person)

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id))
        )
    }
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

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App