import Weather from './Weather';
const Countries = ({ filteredCountries, handleDetails }) => {
    return (
    <div className='countries'>
        {filteredCountries.length > 10 ? (
            <p>Too many matches({filteredCountries.length} countries), specify another filter</p>
        ) : filteredCountries.length === 1 ? (
            <div>
                <h2>{filteredCountries[0].name.common}</h2>
                <p>Capital: {filteredCountries[0].capital}</p>
                <p>Area: {filteredCountries[0].area}</p>
                <p>Population: {filteredCountries[0].population}</p>

                <h3>Languages:</h3>
                <ul>
                {Object.values(filteredCountries[0].languages).map((lang, index) => (
                    <li key={index}>{lang}</li>
                ))}
                </ul>
                <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} />
                <Weather cityName={filteredCountries[0].name.common} latlon={filteredCountries[0].latlng} />
            </div>
        ) : (
            <ul>
            {filteredCountries.map((country) => (
                <li key={country.cca2}>
                    {country.name.common}
                    <button onClick={() => handleDetails(country)}>Show details</button>
                </li>
            ))}
            </ul>
        )}
     </div>
    )
}

export default Countries;