// import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = API_KEY;

const API_KEY = 'live_EMy1ubcZ9bFT72e9VldLnwrdpNk0y9R9mdfOOCUDGkbvHtYHSXQXfVCcVTOSvG7I';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds () {
    const END_POINT = '/breeds'  
    const queryParams = new URLSearchParams({
        api_key: API_KEY,
    })

    return fetch(`${BASE_URL}${END_POINT}?${queryParams}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.statusText)
            }
            return response.json()
    })
};

export { fetchBreeds };
    
function fetchCatByBreed(breedId) {
    const END_POINT = '/images/search'
    const queryParams = new URLSearchParams({
        api_key: API_KEY,
        breed_ids: breedId,
    })
    
    return fetch(`${BASE_URL}${END_POINT}?${queryParams}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.statusText)
            }
            return response.json()
        })
    
}

export { fetchCatByBreed };

