const $ = (selector) => document.querySelector(selector);
const container = $('#container-image');
const buttonPrev = $('#buttonPrev');
const buttonNext = $('#buttonNext');
//Funcion pura, que solo haga una cosa, y devuelva un valor
const createImage = (link, alt, index) => {
    const image = document.createElement('img'); //Creamos la etiqueta image <img>
    image.setAttribute('src', link) //Agregammos a la etiqueta image, el src
    image.setAttribute('alt', alt) //Agregamos a la etiqueta image, el atributo alt
    image.setAttribute('width', '200');
    image.setAttribute('class', 'd-block');

    const div = document.createElement('div')
    div.setAttribute('class', 'carousel-item')
    div.appendChild(image);

    (index === 0) ? div.setAttribute('class', 'carousel-item active') : '';

    return div;
}
const createContainerImages = (data) => {
    for (let i = 0; i < data.length; i++) {
        let image = createImage(data[i][0], data[i][1], i);
        container.appendChild(image);
    }
}

const movePrev = (elements) => {
    let counter = 0;
    elements.forEach((element, index) => {
        if (element.classList.contains('active')) {
            element.classList.toggle('active');
            counter = index;
        }
    })
    if (counter > 0) {
        counter--;
        elements[counter].classList.toggle('active');
    } else {
        elements.at(-1).classList.toggle('active');
    }
}

const moveNext = (elements) => {
    let counter = 0;
    elements.forEach((element, index) => {
        if (element.classList.contains('active')) {
            element.classList.toggle('active');
            counter = index;
        }
    })
    if (elements.length - 1 > counter) {
        counter++;
        elements[counter].classList.toggle('active');
    } else {
        elements[0].classList.toggle('active');
    }
}
//console.log(container + `jfsdlkfjdslk`)

//RECUPERANDO DATOS EN UNA API
const API_URL = 'https://tasse-c7137-default-rtdb.firebaseio.com/images.json';

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        createContainerImages(data);
        let arr = Array.from(container.children); //transformamos en un formato de array el contenedor

        buttonNext.addEventListener('click', () => {
            moveNext(arr)
        })
        buttonPrev.addEventListener('click', () => {
            movePrev(arr);
        })
    })
    .catch(err => console.error(err));


