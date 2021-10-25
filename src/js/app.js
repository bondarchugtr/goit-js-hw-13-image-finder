import apiService from './apiService';
import cardImage from '../tamplate/image-card.hbs';
import cardForm from '../tamplate/form.hbs';
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
        renderCard(searchQuery, page)
    })
}
// modal
function onOpenImgModal(src, alt) {
    imgModal.src = src;
    imgModal.alt = alt;
}

const openModal = document.querySelector('.js-lightbox');
const modalClose = document.querySelector('[data-action="close-lightbox"]');
const imgModal = document.querySelector('img.lightbox__image');
const galleryArrowLeft = document.querySelector('.lightbox__arrow-left');
const galleryArrowRight = document.querySelector('.lightbox__arrow-right');

// galleryArrowLeft.addEventListener('click', onClickArrowLeft);
galleryContainer.addEventListener('click', onOpenModalClick);
// galleryArrowRight.addEventListener('click', onClickArrowRight);

function onOpenModalClick(event) {
    if (event.target.nodeName !== 'IMG') return
    event.preventDefault()
    onOpenImgModal(`${event.path[0].dataset.set}, ${event.path[0].alt}>`);
    openModal.classList.add('is-open');
    modalClose.addEventListener('click', (e) => {
        openModal.classList.remove('is-open')
        onOpenImgModal(" ", " ")
    })

}

window.addEventListener('keydown', (event) => {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
        openModal.classList.remove('is-open')
        onOpenImgModal(" ", " ")
    }
    const LEFT_ARROW = 'ArrowLeft';
    if (event.code === LEFT_ARROW) {
        onClickArrowLeft()
    }
    const RIGHT_ARROW = 'ArrowRight';
    if (event.code === RIGHT_ARROW) {
        onClickArrowRight()
    }
})

// function clickSearchRules(src) {
//     const searchForEntry = gallery.indexOf(gallery.find(el => el.original === src));
//     return searchForEntry;
// }

// function onClickArrowRight(src) {

    // let currentImgIndex = clickSearchRules(imgModal.getAttribute('src'));
    // if (currentImgIndex === galleryItems.length - 1) {
    //     currentImgIndex = -1;
    // }

    // onOpenImgModal(
    //     galleryItems[currentImgIndex + 1].original,
    //     galleryItems[currentImgIndex + 1].description,
    // );
    // console.log(currentImgIndex)
// }




// const intersectionObserver = new IntersectionObserver(function (entries) {
//     console.log('object');
//     if (entries[0].intersectionRatio <= 0) return;
//     loadItems(10);
//     console.log('Loaded new items');
// });
// // начать наблюдение
// intersectionObserver.observe(document.querySelector('.scrollerFooter'));
