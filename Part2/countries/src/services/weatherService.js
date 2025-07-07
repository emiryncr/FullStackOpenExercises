import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const  getWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return axios.get(url).then(response =>{ 
    console.log("Response data:", response.data);
    return response.data;
  });
};

export default {
  getWeather
};
