/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)');


const API = 'https://randomfox.ca/floof';

const fetchData = async (url) => {
    
    try {
        
        const request = await fetch(url);
        
        if (request.status != '200') {
            console.error('Error en status en funcion fetchData, status: ' + request.status);
        }
        
        const data = await request.json();
        return data;
        
    } catch (error) {
        console.error('Error en peticion de fetchData, error: ' + error);
    }

}

{/* <div class="app_imageContainer"> 
<img class="app_image" src="https://randomfox.ca/images/84.jpg" alt="fox image">
</div> */}

const getRandomFoxes = async (url) => {
    const data = await fetchData(url);
    
    const imageUrl = data.image;

    // Maquetamos el HTML desde dentro hacia afuera para ir insertando los child
    const img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.classList.add('app_image');
    img.setAttribute('alt', 'fox image');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('app_imageContainer');
    imageContainer.appendChild(img);

    const app = document.querySelector('#app');
    app.appendChild(imageContainer);

}

// fetchData(API);
getRandomFoxes(API);
getRandomFoxes(API);
getRandomFoxes(API);