

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
axios.defaults.headers.common['x-api-key'] =
  'live_zztzc4AmgD7EwTvSM0LT5gurHZ3r5ZrpdgG4IXetibQ67Z9ckuNdqnRDnqgFdB4c';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_zztzc4AmgD7EwTvSM0LT5gurHZ3r5ZrpdgG4IXetibQ67Z9ckuNdqnRDnqgFdB4c';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
      );
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(
        Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
      );
    });
}

