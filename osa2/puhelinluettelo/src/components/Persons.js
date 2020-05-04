import React from 'react'


const Person = (props) => {
    return <p>
        {props.person.name} {props.person.number} 
        <button onClick={() => props.deletePerson(props.person)}>delete</button>
    </p>
}

const Persons = (props) => {
    return <>
        <ul>
            {props.personsToShow.map((person) =>
                <Person key={person.name} 
                        person={person} 
                        deletePerson={props.deletePerson} /> 
            )}
        </ul>
    </>
}


export default Persons