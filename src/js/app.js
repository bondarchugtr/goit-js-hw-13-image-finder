import apiService from './apiService';
import cardImage from '../tamplate/image-card.hbs';
import cardList from '../tamplate/list-gallery.hbs';
import cardForm from '../tamplate/form.hbs';
import refs from './refs.js'

const { body, searchForm, listImg, galleryItem, galleryList } = refs;

renderformPages()
function renderformPages(form) {
    const marcup = cardForm()
    body.insertAdjacentHTML("beforebegin", marcup);
    console.log(marcup)
}


function renderListCard(list) {
    const marcup = cardImage(list);
    galleryList.insertAdjacentHTML("beforebegin", marcup);
}
renderListCard()

function renderCardImage(card) {
    const marcup = cardImage(card);
    galleryItem.insertAdjacentHTML("beforebegin", marcup);

}


function renderCard(car) {
    apiService(car)
        .then(data => {
            renderCardImage(data)

        })
        .catch(() => {
            errorPopUp()
        });
}


// export class APIpexel {
//     constructor() {
//         this.API_KEY = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`
//         this.BASE_URL = `https://pixabay.com/api/`
//         this.endPoint = `/search`
//         this._page = 1
//         this._query = ''
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

//     getFetch(place) {
//         axios.defaults.headers.common.Authorization = this.API_KEY
//         let params = `?query=${this._query}&per_page=5&page=${this._page}`
//         let url = this.BASE_URL + this.endPoint + params
//         console.log('что идет в запрос: ', this._page, this._query)
//         axios
//             .get(url)
//             //   .then(r => r.data.photos)
//             .then(r => {
//                 return r.data.photos
//             })
//             .then(d => {
//                 // console.log(d)
//                 let m = this.createMUimages(d)
//                 place.insertAdjacentHTML('beforeend', m)
//                 console.log(document.documentElement)

//                 // делаем скролл вниз не мгновенно, с задержкой
//                 setTimeout(
//                     () =>
//                         window.scrollTo({
//                             // прокрутку делаем на всю высоту html вниз
//                             top: document.documentElement.offsetHeight,
//                             behavior: 'smooth',
//                         }),
//                     500,
//                 )
//             })
//             .catch(err => console.log(err))
//     }
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