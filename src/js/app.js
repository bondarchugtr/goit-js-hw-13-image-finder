import apiService from './apiService';
import cardImage from '../tamplate/image-card.hbs';
import cardForm from '../tamplate/form.hbs';
import modalImg from '../tamplate/modal.hbs';
import refs from './refs.js';
import { debounce } from 'debounce';
import modalImage from './modal-img'
const { main, form, btnOpenImage, galleryList, galleryContainer, body } = refs;
renderformSearch()

const searchForm = document.querySelector('form');
let page = 1;
let searchQuery = ''

function remuveHidden() {
    btnOpenImage.classList.remove('hidden')
}

//form search
function renderformSearch(form) {
    const marcup = cardForm(form)
    main.insertAdjacentHTML("afterbegin", marcup)
}

//render foto card
function renderFotoCard(card) {
    const marcup = cardImage(card.hits);
    if (page === 1) {
        galleryList.innerHTML = marcup;
    } else {
        btnOpenImage.classList.remove('.hidden')
        galleryList.insertAdjacentHTML('beforeend', marcup)
    }


}

//input value
function onInputNameFoto() {
    searchForm.addEventListener('submit', e => {
        e.preventDefault()
        page = 1;
        searchQuery = e.currentTarget.elements[0].value;
        renderCard(searchQuery);
    });
}
onInputNameFoto()

// render card
function renderCard(searchQuery, page) {
    apiService(searchQuery, page)
        .then(data => {
            renderFotoCard(data)
            onBtnOpenImg()
            remuveHidden()
            setTimeout(
                () =>
                    window.scrollTo({
                        top: document.documentElement.offsetHeight,
                        behavior: 'smooth',
                    }), 500)
        })
        .catch(() => {
            alert('error')
        });
}
// click open img
function onBtnOpenImg() {
    const btnOpenImage = document.querySelector('.button__open')
    btnOpenImage.classList.remove('.hidden')
    btnOpenImage.addEventListener('click', el => {
        page += 1
        console.log(page);
        renderCard(searchQuery, page)
    })
}

// modal
const basicLightbox = require('basiclightbox')
galleryContainer.addEventListener('click', onOpenModalClick)

function onOpenModalClick(event) {
    console.log(event);
    if (event.target.nodeName !== 'IMG') {
        return
    } else {
        event.preventDefault()
    }
    renderModalImg()
    const openModal = document.querySelector('.js-lightbox');
    openModal.classList.add('is-open')

    const instance = basicLightbox
        .create(`<img src="${event.path[0].dataset.largeImg}" alt="${event.path[0].alt}">`)
        .show();

    const modalClose = document.querySelector('[data-action="close-lightbox"]')
    window.addEventListener('keydown', (e) => {
        openModal.classList.remove('is-open')
    })

    modalClose.addEventListener('click', (e) => {
        openModal.classList.remove('is-open')
    })
}

function renderModalImg(modal) {
    const marcup = modalImg(modal);
    main.insertAdjacentHTML("beforeend", marcup)
}



// const intersectionObserver = new IntersectionObserver(function (entries) {
//     console.log('object');
//     if (entries[0].intersectionRatio <= 0) return;
//     loadItems(10);
//     console.log('Loaded new items');
// });
// // начать наблюдение
// intersectionObserver.observe(document.querySelector('.scrollerFooter'));
