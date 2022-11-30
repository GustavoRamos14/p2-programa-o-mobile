import axios from 'axios';



const api = axios.create({
  baseURL: 'https://free.currencyconverterapi.com/api/v7/',
});

export default api;