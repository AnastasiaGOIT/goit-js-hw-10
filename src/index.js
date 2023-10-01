import axios from 'axios';

// import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: 'select',
// });
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_JlpgD5LjMPXqnfbdBzuobVXBrTl7X1HSYzZlZGsvu1aANVyPApJiTRp2NpcoLvGo';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

fetchBreeds()
  .then(breeds => {
    const options = breeds.map(breed => {
      const optionEl = document.createElement('option');
      optionEl.textContent = breed.name;
      optionEl.value = breed.id;
      return optionEl;
    });

    select.append(...options);
  })
  .catch(err => console.log(err));
error.style.display = 'none';
loader.style.display = 'none';
// loader.classList.add('none');

select.addEventListener('change', onChange);

function onChange(e) {
  const breedId = e.target.value;
  //   info.classList.add('none');
  info.style.display = 'none';
  select.style.display = 'none';
  loader.style.display = 'block';
  //   loader.classList.remove('none');

  fetchCatByBreed(breedId)
    .then(data => {
      const [cat] = data;
      info.style.display = 'none';
      //   info.classList.add('none');
      info.innerHTML = `<img
   src="${cat.url}"
   alt="${cat.breeds[0].name}" width='300'
 />
 <h2>${cat.breeds[0].name}</h2>
 <p>${cat.breeds[0].description}</p>
 <p>${cat.breeds[0].temperament}</p>`;
      //   info.classList.remove('none');
      info.style.display = 'block';
      select.style.display = 'block';
      loader.style.display = 'none';
      //   loader.classList.add('none');
    })
    .catch(() => {
      //   info.classList.add('none');
      info.style.display = 'none';
      Notiflix.Report.failure('Title', 'Message', 'Button Text');
    });
}
