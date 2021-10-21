import apiService from './apiService';
import cardImage from '../tamplate/image-card.hbs';
import cardList from '../tamplate/list-gallery.hbs';
import cardForm from '../tamplate/form.hbs';
import refs from './refs.js'
import { debounce } from 'debounce';

const { main, form, btnOpenImage } = refs;
renderformSearch()

//form search
function renderformSearch(form) {
    const marcup = cardForm(form)
    main.insertAdjacentHTML("beforeend", marcup)
}


//list foto
function renderListCard(card) {
    const marcup = cardList(card);
    main.insertAdjacentHTML("beforeend", marcup);
}


//foto card
function renderFotoCard(card) {
    const galleryItem = document.querySelector('.gallery__item')
    const marcup = cardImage(card);
    renderListCard()
    galleryItem.insertAdjacentHTML('afterbegin', marcup)
}
//input value
function onInputNameFoto() {
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('input', debounce((e) => {
        const tags = e.target.value
        renderCard(tags)
    }, 500));
}
onInputNameFoto()

function renderCard(tags, pages) {
    apiService(tags, pages)
        .then(data => {
            let pages = 1;
            renderListCard()
            renderFotoCard(data)
            const btnOpenImage = document.querySelector('.button__open')
            btnOpenImage.addEventListener('click', el => {
                el.preventDefault()
                pages += 1
                console.log(pages);
            })
        })
        .catch(() => {
            alert('error')
        });
}


// function onBtnOpenImg() {
//     const btnOpenImage = document.querySelector('.button__open')
//     btnOpenImage.addEventListener('click', el => {
//         el.preventDefault()
//         if (el.target) {
//             renderCard()
//         }
//     })
// }



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