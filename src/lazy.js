import * as nodes from './nodes';

// 2- Funcion que valida si nuestro target esta dentro del viewport (pantalla)
const isIntersecting = (entry) => {
    return entry.isIntersecting; // true si esta dentro de la pantalla
};

// 3- Funcion que define la accion que se ejecutara
export const action = (entry) => {

    // Seleccionamos al container (div.app_imageContainer)
    const container = entry.target;

    // Seleccionamos al loading skeleton que esta dentro del container
    const imgWrapper = container.firstChild;

    // Seleccionamos a la imagen que esta dentro del loading skeleton
    const img = imgWrapper.firstChild;

    // Extraemos la url que le habiamos puesto a la imagen en el stributo custom
    const url = img.dataset.src;

    // Le cargamos el src a la imagen para que se visualize
    img.src = url;
    console.log('hellooooooooo')

    // Acciones dummy
    // console.log(container);
    // console.log(container.nodeName);
    // console.log('Hello World');

    // Una vez que se ejecuta la accion, lo dejamos de observar para ya no tomar en cuenta a ese item
    observer.unobserve(container);
};

const generateReport = (entry) => {
    const container = entry.target;

    // *** Reporte ***

    // Todos los hijos de div.app
        // entry.target = (div.app_imageContainer)
        // entry.target,parentElement = (div.app)
        // entry.target,parentElement.children = HTMLCollection(n) [div.appContainer, div.appContainer];
        const childrenContainersArray = [...entry.target.parentElement.children];

        // Array que contendra las url de todas las imagenes
        let loadedImagesurls = [];
    
        // Variable que contara cuantas imagenes han sido cargadas
        let loadedImagesCounter = 0
    
        // Recorrer el arreglo de elementos hasta conseguir el contenido de su atributo src
        childrenContainersArray.forEach(element => {
            // element = (div.app_imageContainer)
            // Dotwalkear desde el div parent (div.app_imageContainer) donde se encuentra la imagen hasta llegar a la URL
            // div.app_imageContainer > div.loading_skeleton_main_images > img > src
            const imageNodes = element.children[0].children[0].src;
    
            // Insertamos el contenido de src en un arreglo
            loadedImagesurls.push(imageNodes);
    
        });
    
        // Recorrer el arreglo de src de cada elemento, si el src es diferente a vacio, cuenta como imagen cargada
        loadedImagesurls.forEach(srcValueOfElement => {
            if (srcValueOfElement) {
                loadedImagesCounter++;
            }
        });
    
        // console.log(loadedImagesCounter);
    
        console.log('⚪ Total de imagenes: ' + childrenContainersArray.length);
        console.log('🟣 Imagenes cargadas: ' + loadedImagesCounter);
        console.log('---------------------------------');
    
        // debugger;
            // Ya no es necesario dejar de observarlo porque ya lo dejamos de observar en la funcion de cargar imagen (action) y esto funciona ya que es el mismo observador
    // observer.unobserve(container);
};

// 1- Creamos el observador
    // el intersectionObserver recibe una funcionQueHacer por cada imagen (funcion inline)
    // Nos va a pasar todas las entradas (All elements) que en ese momento esta escuchando
const observer = new IntersectionObserver ((entries) => {
    // filter - Filtra solo los elementos que se estan interseptando en el viewport
    // forEach - Cada uno de los elementos que ya se encuentran en la pantalla, vamos a realizar una accion
    entries.filter(isIntersecting).forEach(action);
    entries.filter(isIntersecting).forEach(generateReport);
});

// Funcion que hace uso de la instancia del observador que previamente declaramos
    // Le decimos que observe a la imagen que le vamos a estar pasando (en el index.js)
export const registerImage = (image) => {
    // IntersectionObserver -> observer(image)
    observer.observe(image);
};