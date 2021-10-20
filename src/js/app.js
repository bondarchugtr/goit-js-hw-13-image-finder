import apiService from './apiService';
import cardImage from '../tamplate/image-card.hbs';
import cardList from '../tamplate/list-gallery.hbs';
import cardForm from '../tamplate/form.hbs';
import refs from './refs.js'

const { main, listImg, galleryItem, galleryList, photoCard, idJsItem, form } = refs;




// const searchForm = document.getElementById('search-form')
// const nameSearchInput = searchForm.value;


//form search
function renderformSearch(form) {
    const marcup = cardForm(form)
    main.insertAdjacentHTML("beforeend", marcup)
    const searchForm = document.getElementById('search-form')
    const nameSearchInput = searchForm.value;
    searchForm.addEventListener('input', onInputNameFoto);
    function onInputNameFoto(evt) {
        let tags = evt.target.value
        console.log(tags)
    }
    console.log(marcup)
}

renderformSearch()

//list foto
function renderListCard(card) {
    const marcup = cardList(card);
    main.insertAdjacentHTML("beforeend", marcup);
}
renderListCard()


//foto card
function renderFotoCard(card) {
    const galleryItem = document.querySelector('.gallery__item')
    const marcup = cardImage(card);
    galleryItem.insertAdjacentHTML('afterbegin', marcup)
}
renderFotoCard()




function renderCard(all) {
    console.log(all);
    apiService(all)
        .then(data => {
            renderFotoCard(data)
            console.log(data);
        })
        .catch(() => {
            alert('error')
        });
}

renderCard()

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