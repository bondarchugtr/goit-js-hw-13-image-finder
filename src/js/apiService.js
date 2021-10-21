// import { APIpexel } from './app.js'

export default function apiService(tags, pages) {

    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${tags}&page=${pages}&per_page=12&key=23937697-9e9e797303b592bb126e18e87
`)
        .then(response => {
            return response.json();
        }).catch(error => alert(errorNot));
};

