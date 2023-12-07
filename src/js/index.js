import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelectEl = document.querySelector('.breed-select')
const errorEL = document.querySelector('.error')
const loaderEl = document.querySelector('.loader')
const catInfoDivEl = document.querySelector('.cat-info')

document.addEventListener("DOMContentLoaded", async () => {
    try {
      loaderEl.classList.remove('hidden');
      const breeds = await fetchBreeds();
          
      new SlimSelect({
        select: breedSelectEl,
        data: [{
          'placeholder': true,
          'text': 'Choose a cat breed' },
          ...breeds.map(breed => ({value: breed.id, text: breed.name})),

        ]
      })
          
      breedSelectEl.classList.remove('hidden');
      loaderEl.classList.add('hidden');

      breedSelectEl.addEventListener('change', async () => {
        loaderEl.classList.remove('hidden');

      try {
        const selectedBreedId = breedSelectEl.value;

        const catInfo = await fetchCatByBreed(selectedBreedId);
        createMarkup(catInfo);
      } catch (error) {
          Notiflix.Report.info('Error', errorEL.textContent, 'OK');
      } finally {
        loaderEl.classList.add('hidden');
      }
    });
        
} catch (error) {
    Notiflix.Report.info('Error', errorEL.textContent, 'OK');
} finally {
  loaderEl.classList.add('hidden');
}

  function createMarkup(catInfo) {
    catInfoDivEl.innerHTML = `<img src="${catInfo[0].url}" width=500 alt="Photo of a ${catInfo[0].breeds[0].name} cat"><div class='desc-container'><h1>Breed: <i>${catInfo[0].breeds[0].name}</i></h1><p>${catInfo[0].breeds[0].description}</p><p><b>Temperament:</b> ${catInfo[0].breeds[0].temperament}</p></div>`;
        
    catInfoDivEl.classList.remove('hidden');
  }        
});