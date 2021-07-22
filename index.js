import {galleryItems} from "./app.js";

const placeForImageRef = document.querySelector(".js-gallery");


function createImageMarkup(galleryItems) {
   return galleryItems.map(({preview, original, description}) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${preview}"
    >
      <img
        class="gallery__image"
        src="${original}"
        data-source="${preview}"
        alt="${description}"
      />
    </a>
  </li>
  `})
};

placeForImageRef.insertAdjacentHTML("beforeend", createImageMarkup(galleryItems));

const makeBigPic = (e)=>{
    if(!e.target.classList.contains("gallery__item")) {
        return;
    }

    
};

placeForImageRef.addEventListener("click", makeBigPic);