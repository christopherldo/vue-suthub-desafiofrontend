import axios from 'axios';

const BASE_API = 'https://restcountries.com/v2';

export default {
  getCountriesByRegionalBloc(bloc) {
    return axios.get(`${BASE_API}/regionalbloc/${bloc}`);
  }
}