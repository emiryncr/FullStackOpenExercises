import { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';

const Weather = ({ cityName, latlon }) => {
    const [weather, setWeather] = useState(null);
    console.log("Weather component received latlon:", latlon);

    useEffect(() => {
        weatherService
            .getWeather(latlon[0], latlon[1])
            .then(weatherData => {
                console.log("Weather data received:", weatherData);
                setWeather(weatherData);
            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
            });
    }, [latlon]);

    return (
        <div>
            {weather ? (
                <div>
                    <h3>Weather in {cityName}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                    <p>Condition:
                        {weather.weather[0].description} 
                    </p>
                    <p>Wind:
                        {weather.wind.speed} m/s
                    </p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default Weather;