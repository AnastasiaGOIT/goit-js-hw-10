import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_JlpgD5LjMPXqnfbdBzuobVXBrTl7X1HSYzZlZGsvu1aANVyPApJiTRp2NpcoLvGo';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
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
      .then(markUpFunction(breedId))
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
