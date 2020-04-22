import React from 'react'

const Country = (props) => {
    const country = props.country
    return <div>
        <h2>{country.name}</h2>

        capital {country.capital} <br></br>
        population {country.population}

        <h3>languages</h3>

        <ul>
            {country.languages.map((lang) =>
                <li key={lang.name}>{lang.name}</li>
            )}
        </ul>

        <img src={country.flag} height="100"></img>

    </div>
}

export default Country