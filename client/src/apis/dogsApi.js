import axios from 'axios';

const dogsApi = axios.create({
  baseURL: 'http://192.168.100.10:3001',
});

export default dogsApi;
