// import { APIpexel } from './app.js'



export default function apiService(all) {

    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=all&page=1&per_page=20&key=23937697-9e9e797303b592bb126e18e87
`)
        .then(response => {
            return response.json();
        }).catch(error => alert(errorNot));
};

