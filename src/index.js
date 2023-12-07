import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';



const breedSelectEl = document.querySelector('.breed-select')
const errorEL = document.querySelector('.error')
const loaderEl = document.querySelector('.loader')
const catInfoDivEl = document.querySelector('.cat-info')
errorEL.style.display = 'none';
breedSelectEl.classList.add('hidden');

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const breeds = await fetchBreeds();

        breeds.forEach(breed => {
            breedSelectEl.innerHTML += `<option value="${breed.id}">${breed.name}</option>`;
          });

          //Отримуємо дані про породу кота, які зберігаються в localStorage
          const storedBreedId = localStorage.getItem('selectedBreedId');
          if (storedBreedId) {
              breedSelectEl.value = storedBreedId;
          }

          new SlimSelect({
            select: breedSelectEl,
          })
        breedSelectEl.classList.remove('hidden');
        loaderEl.style.display = 'none';

         // Отримуємо інформацію про першу породу при першому завантаженні
        const initialBreedId = breedSelectEl.value;
        const initialCatInfo = await fetchCatByBreed(initialBreedId);
        createMarkup(initialCatInfo);

        breedSelectEl.addEventListener('change', async () => {
            loaderEl.style.display = 'block';
            catInfoDivEl.style.display = 'none';

      try {
        const selectedBreedId = breedSelectEl.value;
        localStorage.setItem('selectedBreedId', selectedBreedId); //Зберігаємо дані про вибрану породу в localStorage

        const catInfo = await fetchCatByBreed(selectedBreedId);
        createMarkup(catInfo);
      } catch (error) {
        loaderEl.style.display = 'none';
        breedSelectEl.style.display = 'none'
        Notiflix.Notify.failure(error.message);
        Notiflix.Report.info('Error', errorEL.textContent, 'OK');
      } finally {
        loaderEl.style.display = 'none';
      }
    });
        
} catch (error) {
    // Notiflix.Notify.failure('Помилка при завантаженні порід');
    loaderEl.style.display = 'none';
    breedSelectEl.style.display = 'none'
    Notiflix.Notify.failure(error.message);

    Notiflix.Report.info('Error', errorEL.textContent, 'OK');
        // errorEL.style.display = 'block';
        }

  function createMarkup(catInfo) {
    catInfoDivEl.innerHTML = `<img src="${catInfo[0].url}" width=500 alt="Photo of a ${catInfo[0].breeds[0].name} cat"><div class='desc-container'><h1>Breed: <i>${catInfo[0].breeds[0].name}</i></h1><p>${catInfo[0].breeds[0].description}</p><p><b>Temperament:</b> ${catInfo[0].breeds[0].temperament}</p></div`;
        
    catInfoDivEl.style.display = 'flex';
  }        
});