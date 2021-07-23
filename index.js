import {galleryItems} from "./app.js";

const ulListRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const modalImageRef = document.querySelector(".lightbox__image");

function createImageMarkup(galleryItems) {
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

ulListRef.insertAdjacentHTML("beforeend", createImageMarkup(galleryItems));

const galleryImageRef = document.querySelectorAll(".gallery__image");
const currentIndex = [...galleryImageRef].map((item, index) => item.dataset.index = `${index}`);

const modalIsOpen = (e)=>{
    if(!e.target.classList.contains("gallery__image")) {
        return;
    }
    e.preventDefault();
    modalRef.classList.add("is-open");
    modalImageRef.src = e.target.dataset.source;
    modalImageRef.alt = e.target.alt;
    modalImageRef.dataset.index = e.target.dataset.index;
};

const modalIsClose = (e) =>{
    if(e.target.classList.contains("lightbox__button") || e.target.classList.contains("lightbox__overlay")) {
        modalRef.classList.remove("is-open");
        modalImageRef.src = "";
        modalImageRef.alt = "";
        modalImageRef.dataset.index = "";
}
return;
}


const closeModalEsc = (e) => {
    if(e.key === "Escape") {
    modalRef.classList.remove("is-open");
    modalImageRef.src = "";
    modalImageRef.alt = "";
    modalImageRef.dataset.index = "";
  };
  
  let index = Number(modalImageRef.dataset.index)

  if(e.key === "ArrowRight" && index <= galleryItems.length) { 
    modalImageRef.src = galleryItems[index+1].original;
    modalImageRef.dataset.index = index +1
  }
  if(e.key === "ArrowLeft"&& index >= 0) {
    modalImageRef.src = galleryItems[index-1].original;
    modalImageRef.dataset.index = index -1
    }
};


ulListRef.addEventListener("click", modalIsOpen);
modalRef.addEventListener("click", modalIsClose);
window.addEventListener("keydown", closeModalEsc);