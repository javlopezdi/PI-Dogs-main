import axios from 'axios';

const dogsApi = axios.create({
  baseURL: '/api',
});

export default dogsApi;
