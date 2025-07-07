import { useState, useEffect } from 'react'
import countryService from './services/countryService';
import CountryForm from './components/CountryForm';
import Countries from './components/Countries';

function App() {
  const [cntryName, setCntryName] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch countries from the API when the component mounts
  const hook = () => {
    countryService
      .getAllCountries()
      .then(res =>{
        //i do not want to see whole array
        console.log(res);
        setCountries(res);
      })
      .catch(err => {
        console.error("Error fetching countries:", err);
      });
  }

  useEffect(hook, []);


  // Function to fetch countries based on the input
  const handleCntryChange = (e) => {
    console.log(e.target.value);
    setCntryName(e.target.value)
    // Reset selected country when input changes
    setSelectedCountry(null);
  }

  const filteredCountries = cntryName ? countries.filter(country => 
    country.name.common.toLowerCase().includes(cntryName.toLowerCase())
  ) : countries;

  const handleDetails = (country) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
  }

  return (
    <>
     <h1>Countries Project</h1>
     <CountryForm 
        cntryName={cntryName}
        handleCntryChange={handleCntryChange}
     />
     <Countries 
        filteredCountries={selectedCountry ? [selectedCountry] : filteredCountries} 
        handleDetails={handleDetails}
     />  
    </>
  )
}

export default App
