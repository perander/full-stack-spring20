import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Filter from './components/FilterForm'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const showCountry = (country) => {
    //console.log("näytä maa ", country.name);
    setNewFilter(country.name) 
    /* ^Oma kenties huono ratkaisu. Ohjelmassa ei ole unshow-nappia, eli nyt tapa päästä takaisin useamman
    esim sw-sisältävän maan listaan on muuttaa filtteriä takaisin sw:ksi. Tein ratkaisun näin, 
    koska vaikutti vähän oudolta, jos filtteristä ei voisi päätellä, mikä maa näkyy.
    Jos olisi joku palaa-nappi, en välttämättä korvaisi filtteriä. */
  } 

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value) 
  }

  const countriesFound = countries.filter(
      country => country.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter text={'find countries '} value={newFilter} handleChange={handleFilterChange}/>

      <Countries countriesToShow={countriesFound} showCountry={showCountry}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
