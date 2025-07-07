import axios from 'axios';
const COUNTRIES_API = 'https://studies.cs.helsinki.fi/restcountries/';

const getAllCountries = () => {
    const req = axios.get(COUNTRIES_API + 'api/all')
    return req.then(res => res.data);
}

export default {
    getAllCountries
}