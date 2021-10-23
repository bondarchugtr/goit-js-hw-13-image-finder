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

// export class APIpexel {
//     constructor({ root = 'main' }) {
//         this.root = root;
//         this.currentPage = 1;
//         this.DASE_URL = 'https://pixabay.com/api/';
//         this.searchQuery = 'car';
//         this.perPage = 4;
//         this.API_KEY = '23908386-2e3165467d660ea2c64c020be';
//         this.lastPage = false;
//     }
//     get query() {
//         return this._query
//     }
//     set query(value) {
//         return (this._query = value)
//     }

//     get page() {
//         return this._page
//     }
//     set page(value) {
//         return (this._page += value)
//     }
//     resetPage() {
//         this._page = 1
//     }

//     // getFetch(place) {
//     //     axios.defaults.headers.common.Authorization = this.API_KEY
//     //     let params = `?query=${this._query}&per_page=5&page=${this._page}`
//     //     let url = this.BASE_URL + this.endPoint + params
//     //     console.log('что идет в запрос: ', this._page, this._query)
//     //     axios
//     //         .get(url)
//     //         //   .then(r => r.data.photos)
//     //         .then(r => {
//     //             return r.data.photos
//     //         })
//     //         .then(d => {
//     //             // console.log(d)
//     //             let m = this.createMUimages(d)
//     //             place.insertAdjacentHTML('beforeend', m)
//     //             console.log(document.documentElement)

//     //             // делаем скролл вниз не мгновенно, с задержкой
//     //             setTimeout(
//     //                 () =>
//     //                     window.scrollTo({
//     //                         // прокрутку делаем на всю высоту html вниз
//     //                         top: document.documentElement.offsetHeight,
//     //                         behavior: 'smooth',
//     //                     }),
//     //                 500,
//     //             )
//     //         })
//     //         .catch(err => console.log(err))
//     // }
//     createMUimages(data) {
//         return data
//             .map(elem => {
//                 //   console.log(elem) // src.original, src.tiny photographer
//                 const {
//                     photographer,
//                     src: { tiny, original },
//                 } = elem
//                 return `
//               <li>
//                 <img src="${tiny}" data-src="${original}" alt="${photographer}" />
//               </li>
//               `
//             })
//             .join('')
//     }
// }