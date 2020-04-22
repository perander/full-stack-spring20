import React from 'react'
import Country from './Country'

const Countries = (props) => {

    if (props.countriesToShow.length > 10) {
        return <>
            Too many matches, specify another filter
        </>
    }

    else if (props.countriesToShow.length === 1) {
        //console.log("löyty");
        
        return <>
            <Country key={props.countriesToShow[0].name} country={props.countriesToShow[0]} />
        </>
    }

    return <>
        <ul>
            {props.countriesToShow.map((country) =>
            <>
                <li key={country.name}>{country.name}
                    <button onClick={props.showCountry}>show</button>
                </li>
                </>
            )}
        </ul>
    </>
}

export default Countries