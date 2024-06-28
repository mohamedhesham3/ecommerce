import axios from 'axios';
 

const api = axios.create({
  baseURL: 'https://ecommerce-2-apgx.onrender.com/',
  withCredentials: true,

});

export default api;
