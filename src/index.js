import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_7rQ0eMZKqrdlo58gDOF1t115hunRXcwNChu7oi4nQ9ehNnK6T7reiR7OXWhR6ay';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
// console.log(info);

fetchBreeds()
  .then(breeds =>
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.textContent = breed.name;
      option.value = breed.id;
      select.appendChild(option);
    })
  )
  .catch(err => console.log(err));

select.addEventListener('change', onChange);
function onChange(e) {
  const breedId = e.target.value;
  if (breedId) {
    fetchCatByBreed(breedId)
      .then(cat => markUpFunction(cat))
      .catch(err => console.log(err));

    function markUpFunction(cat) {
      const markUp = `
 <img
  src="${cat.url}"
  alt="${cat.name}"
/>
<h2>${cat.name}</h2>
<p>${cat.description}</p>
<p>${cat.temperament}</p>`;
      info.innerHTML = markUp;
      return markUp;
    }
  }
}
