import React from 'react'


const Person = (props) => {
    return <>
        <p>{props.person.name} {props.person.number}</p>
    </>
}

const Persons = (props) => {
    return <>
        <ul>
            {props.personsToShow.map((person) =>
                <Person key={person.name} person={person} /> 
            )}
        </ul>
    </>
}


export default Persons