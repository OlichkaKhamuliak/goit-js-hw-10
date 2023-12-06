import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const breedSelectEl = document.querySelector('.breed-select')
const errorEL = document.querySelector('.error')
const loaderEl = document.querySelector('.loader')
const catInfoDivEl = document.querySelector('.cat-info')
errorEL.style.display = 'none';
// loaderEl.style.display = 'none';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Отримати породи та оновити вибір порід
        const breeds = await fetchBreeds();

        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelectEl.appendChild(option);
        });
        loaderEl.style.display = 'none';

         // Отримуємо інформацію про першу породу при першому завантаженні
        const initialBreedId = breedSelectEl.value;
        const initialCatInfo = await fetchCatByBreed(initialBreedId);
        displayCatInfo(initialCatInfo);

        breedSelectEl.addEventListener('change', async () => {
            loaderEl.style.display = 'block';
            catInfoDivEl.style.display = 'none';
            errorEL.style.display = 'none';

      try {
        const selectedBreedId = breedSelectEl.value;
        const catInfo = await fetchCatByBreed(selectedBreedId);
        displayCatInfo(catInfo);
      } catch (error) {
        console.error(error.message);
        errorEL.style.display = 'block';
      } finally {
        loaderEl.style.display = 'none';
      }
    });
        
} catch (error) {
        console.error('Помилка при завантаженні порід:', error);
        errorEL.style.display = 'block';
        }

        function displayCatInfo(catInfo) {
            // Реалізуйте відображення інформації про кота
            catInfoDivEl.innerHTML = `<img src="${catInfo[0].url}" width=500 alt="Cat Image"><h1>Breed: <i>${catInfo[0].breeds[0].name}</i></h1><p>${catInfo[0].breeds[0].description}</p><p><b>Temperament:</b> ${catInfo[0].breeds[0].temperament}</p>`;
        
            catInfoDivEl.style.display = 'block';
          }        
      });