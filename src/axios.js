import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://192.168.254.236:3000'
    baseURL: 'http://192.168.178.73:3000'
});

export default instance;