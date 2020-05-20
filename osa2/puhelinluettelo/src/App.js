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
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)


  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      showErrorMessage(error)
    })
  }, [])


  const showErrorMessage = (message) => {
    setErrorMessage(
      `${message}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }


  const showSuccessMessage = (message) => {
    setSuccessMessage(
      `${message}`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }


  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="success">
        {message}
      </div>
    )
  }


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
          showSuccessMessage(
            `Added ${newPerson.name}`
          )
        })
        .catch(error => {
          showErrorMessage(error)
        })
    }
  }


  const updatePerson = () => {
    const person = persons.find(p => p.name === newName)
    person.number = newNumber

    personService
    .update(person.id, person)
    .then(returned => {
      setPersons(persons.map(p => p.id !== person.id ? p : returned))
      setNewName('')
      setNewNumber('')
      showSuccessMessage(
        `Updated ${person.name}`
      )
    })
    .catch(error => {
      showErrorMessage(
        `Information of ${person.name} has already been removed`
        )
    })
  }


  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id)),
          showSuccessMessage(
            `Deleted ${person.name}`
          )
        )
        .catch(error => {
          showErrorMessage(
            `Information about ${person.name} has already been removed`
            )
        })
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
      
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

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