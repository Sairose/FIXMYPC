import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true, // to allow cookies to be sent with requests
})

export default instance;