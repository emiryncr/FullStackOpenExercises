import axios from 'axios';
const baseUrl = '/api/persons';

//Get all with get
const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res=> res.data);
}

//Create a new person with post
const create = (newObj) => {
    const req = axios.post(baseUrl, newObj);
    return req.then(res=> res.data);
}

//Update a person with put
// Note: The id should be passed in the function parameters
const update = (id, newObj) => {
    //id is the identifier for the person to be updated
    //newObj is the new data for the person
    const req = axios.put(`${baseUrl}/${id}`, newObj);
    return req.then(res => res.data);
}

const remove = (id) => { 
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then(res => res.data);
 }

export default {
    getAll,
    create,
    update,
    remove
}