import * as nodes from './nodes'
import { registerImage, action } from "./lazy";

console.log('Happy hacking :)');

// Utils
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


const getRandomFoxes = async (url) => {
    const data = await fetchData(url);
    
    /*
    {"image": "https://randomfox.ca/images/44.jpg",
    "link": "https://randomfox.ca/?i=44" }
    */
   
   const imageUrl = data.image;

   {/* <div class="app_imageContainer"> 
   <img class="app_image" src="https://randomfox.ca/images/84.jpg" alt="fox image">
   </div> */}
   
    // Maquetamos el HTML desde dentro hacia afuera para ir insertando los child
    const img = document.createElement('img');
    // img.setAttribute('src', imageUrl);
    img.dataset.src = imageUrl;
    // img.dataset.loquesea = 'hellou';
    // img.setAttribute('data-src', imageUrl); // Si usamos setAttribute, el atributo a modificar se tiene que usar con sintaxis HTML
    img.classList.add('app_image');
    img.classList.add('randomClass');
    img.classList.add('randomClass2');
    // img.setAttribute('alt', 'fox image');
    // img.style.width = '450px';
    // img.style.height = '450px';

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('app_image','loading_skeleton_main_images');

    // *** Eventos individuales al clickar cada child (Imagenes)
    // img.addEventListener('click', () => {
    //     console.log("url: " + imageUrl + ", Link: " + data.link);
    // });

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('app_imageContainer');
    // imageContainer.appendChild(img);
    // Observar al container con la imagen
    registerImage(imageContainer);

    const app = document.querySelector('#app');
    imgWrapper.appendChild(img);
    imageContainer.appendChild(imgWrapper);
    app.appendChild(imageContainer);

}

// EventListeners
nodes.agregarBtn.addEventListener('click', (event) => {
    getRandomFoxes(API);
});


nodes.limpiarBtn.addEventListener('click', () => {
    nodes.app.innerHTML = "";
})

// Event delegation
nodes.app.addEventListener('click', (event) => {

    //const nodosDelParent = [...event.target.parentElement.childNodes]

    if (event.target.className.includes('randomClass2')) {
        //console.log('SI contiene');
        // console.log(event);
    } else {
        // console.log('NO contiene');
    }
});


//testDiv.innerText = "Hello World";



// fetchData(API);
// getRandomFoxes(API);
// getRandomFoxes(API);
// getRandomFoxes(API);