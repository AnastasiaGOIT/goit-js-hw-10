// import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '.breed-select',
// });
// import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
function wrapper() {
  loader.style.display = 'block';

  fetchBreeds()
    .then(breeds => {
      const options = createOptions(breeds);
      select.append(...options);
    })
    .catch(err => console.log(err))
    .finally((loader.style.display = 'none'), (error.style.display = 'none'));
}
wrapper();
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
      createMarkup(data);
      //   loader.classList.add('none');
    })
    .catch(() => {
      //   info.classList.add('none');
      info.style.display = 'none';
      Notiflix.Report.failure('Title', 'Message', 'Button Text');
    })
    .finally((info.style.display = 'none'), (loader.style.display = 'block'));
}

function createOptions(breeds) {
  return breeds.map(breed => {
    const optionEl = document.createElement('option');
    optionEl.textContent = breed.name;
    optionEl.value = breed.id;
    return optionEl;
  });
}

function createMarkup(data) {
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
}
