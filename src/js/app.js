import apiService from './apiService';
import cardImage from '../tamplate/image-card.hbs';
import cardForm from '../tamplate/form.hbs';
import refs from './refs.js'
import { debounce } from 'debounce';

const { main, form, btnOpenImage, galleryItem } = refs;
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

//foto card
function renderFotoCard(card) {
    const marcup = cardImage(card.hits);
    if (page === 1) {
        galleryItem.innerHTML = marcup;
    } else {
        btnOpenImage.classList.remove('.hidden')
        galleryItem.insertAdjacentHTML('beforeend', marcup)
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

// const intersectionObserver = new IntersectionObserver(function (entries) {
//     console.log('object');
//     if (entries[0].intersectionRatio <= 0) return;
//     loadItems(10);
//     console.log('Loaded new items');
// });
// // начать наблюдение
// intersectionObserver.observe(document.querySelector('.scrollerFooter'));



function onBtnOpenImg() {
    const btnOpenImage = document.querySelector('.button__open')
    btnOpenImage.classList.remove('.hidden')
    btnOpenImage.addEventListener('click', el => {
        page += 1
        console.log(page);
        renderCard(searchQuery, page)
    })
}
