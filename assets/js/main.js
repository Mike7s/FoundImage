const accessKey = 'hoOwPLI5E6TrtDNHR_2caKA76hHUBpTBdT0qjibaqQo';
let page = 1;
let query = '';
const perPage = 10;
const container = document.querySelector('.card-container');
const inputQuery = document.querySelector('#search-input');
const form = document.querySelector('.form');

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('fetch error:', error)
        return null
    }
}

function createCard(photo) {
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description;
    img.classList.add('card')
    container.appendChild(img)
}

function createShowMoreButton() {
    const buttonPage = document.createElement('button');
    buttonPage.textContent = 'Show more';
    buttonPage.classList.add('showMore');
    container.appendChild(buttonPage);
}

function showMoreEvent() {
    createShowMoreButton();
    const showMoreButton = document.querySelector('.showMore')
    showMoreButton.addEventListener('click', () => {
        page++;
        fetchDataUrl();
    })
}

async function fetchDataUrl() {
    const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${query}&client_id=${accessKey}`;
    const data = await fetchData(url);
    console.log(data)
    if(data && data.errors && data.errors[0] && data.errors[0]  === 
        "query is empty") return
    const results = data.results;
   
    results.forEach(photo => {
        createCard(photo);
    })
    
    const showMoreButton = document.querySelector('.showMore')
    if (showMoreButton) {
         showMoreButton.remove();
    }
    if(page === data.total_pages) return
    showMoreEvent();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    container.replaceChildren();
    query = inputQuery.value;
    fetchDataUrl();

})
