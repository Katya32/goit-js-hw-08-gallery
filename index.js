import {galleryItems} from "./app.js";

const ulListRef = document.querySelector(".js-gallery"); //ссылка куда вставлять разметку
const modalRef = document.querySelector(".js-lightbox"); //ссылка на модальное окно
const modalImageRef = document.querySelector(".lightbox__image");//ссылка на img, который будет показывать полноразмерное изображения

function createImageMarkup(galleryItems) { //функция перебирает массив с картинками и возвращает разметку
    return galleryItems.map(({preview, original, description}) => {
        return `<li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>
        `}).join('')
    };
    
ulListRef.insertAdjacentHTML("beforeend", createImageMarkup(galleryItems)); //вставляем разметку


const modalIsOpen = (e)=>{ //функция открытия модального окна
    if(!e.target.classList.contains("gallery__image")) { //проверка на клик именно на img. если не img, то выходим
        return;
    }
    e.preventDefault(); //отмена действий браузера по умолчанию
    modalRef.classList.add("is-open"); //при клике добавляем класс is-open и в img записываем атрибуты
    modalImageRef.src = e.target.dataset.source;
    modalImageRef.alt = e.target.alt;
    modalImageRef.dataset.index = e.target.dataset.index;
    window.addEventListener("keydown", closeModalEscAndSlider);
};

const modalIsClose = (e) =>{ //функция закрытия модального окна
    if(e.target.classList.contains("lightbox__button") || e.target.classList.contains("lightbox__overlay")) {//если нажали на button или на overlay
        modalRef.classList.remove("is-open");// снимаем класс is-open и в img обнуляем атрибуты
        modalImageRef.src = "";
        modalImageRef.alt = "";
        modalImageRef.dataset.index = "";
    }
    return;
}


const galleryImageRef = document.querySelectorAll(".gallery__image"); //ссылка на все img 
galleryImageRef.forEach((item, index) => item.dataset.index = `${index}`); //в каждый img добавляем атрибут data-index значением которого будет индекс

const closeModalEscAndSlider = (e) => { //при нажатии на клавишу Esc атрибуты обнуляются и модальное окно закрывается
    if(e.code === "Escape") {
        modalRef.classList.remove("is-open");
        modalImageRef.src = "";
        modalImageRef.alt = "";
        modalImageRef.dataset.index = "";
    };
  
    let currentIndexImageInModal = Number(modalImageRef.dataset.index)//в переменную currentIndexImageInModal записываем индекс текущей картинки в модальном окне

    if(e.key === "ArrowRight" && currentIndexImageInModal <= galleryItems.length) { //если нажимаем ArrowRight и индекс <= длины массива
        modalImageRef.src = galleryItems[currentIndexImageInModal + 1 ].original; // в src текищей картинки перезаписывается src следующей картинки
        modalImageRef.dataset.index = currentIndexImageInModal + 1;// а в data-index текущий индекс +1
    } 
    if(e.key === "ArrowLeft" && currentIndexImageInModal >= 0) {
        modalImageRef.src = galleryItems[currentIndexImageInModal-1].original;
        modalImageRef.dataset.index = currentIndexImageInModal -1;
    }
};


ulListRef.addEventListener("click", modalIsOpen);
modalRef.addEventListener("click", modalIsClose);