import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_JlpgD5LjMPXqnfbdBzuobVXBrTl7X1HSYzZlZGsvu1aANVyPApJiTRp2NpcoLvGo';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
export function fetchBreeds() {
  return axios.get('/breeds').then(response => response.data);
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}

// export function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds', {
//       headers: {
//         'X-API-KEY':
//           'live_JlpgD5LjMPXqnfbdBzuobVXBrTl7X1HSYzZlZGsvu1aANVyPApJiTRp2NpcoLvGo',
//       },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     });
// }

// export function fetchCatByBreed(breedId) {
//   return axios
//     .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
//       headers: {
//         'X-API-KEY':
//           'live_JlpgD5LjMPXqnfbdBzuobVXBrTl7X1HSYzZlZGsvu1aANVyPApJiTRp2NpcoLvGo',
//       },
//     })
//     .then(response => {
//       // console.log(response);
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     });
// }
