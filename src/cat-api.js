// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_7rQ0eMZKqrdlo58gDOF1t115hunRXcwNChu7oi4nQ9ehNnK6T7reiR7OXWhR6ay';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  ).then(response => {
    // console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
