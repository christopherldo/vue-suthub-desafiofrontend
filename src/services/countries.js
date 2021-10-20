import axios from 'axios';

const BASE_API = 'https://restcountries.com/v3.1';

export default {
  getCountryByName(name) {
    return axios.get(`${BASE_API}/name/${name}`);
  },
  getCountryByCode(code) {
    return axios.get(`${BASE_API}/alpha/${code}`);
  },
  getCountriesByLanguage(language) {
    return axios.get(`${BASE_API}/lang/${language}`);
  }
}