import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';

const select = new SlimSelect({
  select: '#selectElement',
  settings: {
    allowDeselect: true,
    placeholderText: '',
  },
});

const selectListEl = document.querySelector('#selectElement');
const catInfoMarkup = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds()
  .then(data => {
    select.setData(createSelectList(data));

    loaderEl.style.display = 'none';
    return data;
  })
  .then(() => {
    selectListEl.addEventListener('change', setCatInfo);
  })
  .catch(err => console.log(err));

function createSelectList(data) {
  return data.map(({ id, name }) => ({
    text: name,
    value: id,
  }));
}

function setCatInfo(evt) {
  catInfoMarkup.innerHTML = '';
  loaderEl.style.display = 'block';
  evt.preventDefault();
  const breedId = selectListEl.value;

  fetchCatByBreed(breedId)
    .then(data => {
      catInfoMarkup.innerHTML = createCatInfoMarkup(data);
      loaderEl.style.display = 'none';
      return data;
    })
    .catch(err => console.log(err));
}

function createCatInfoMarkup(data) {
  const [
    {
      breeds: [{ name, temperament, description }],
      url,
    },
  ] = data;
  return  `<img src="${url}" alt="${name}" class="cat-image">
      <div class="cat-dsc">
        <h1 class="cat-name">${name}</h1>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament"><span class="temperament-title">Temperament: </span>${temperament}</p>
      </div>`;
}

