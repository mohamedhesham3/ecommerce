import axios from 'axios';


const api = axios.create({
  baseURL: 'https://ecommerce-2-1ulr.onrender.com',
  withCredentials: true,

});

export default api;
