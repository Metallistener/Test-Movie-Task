import { API_KEY } from '../settings/settings';
const axios = require('axios');

// получает список фильмов
export function getMovies(params) {
    let URL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY;

    if (params) {
        if (params.sort_by) {
            URL += '&sort_by=' + params.sort_by;
        }

        if (params.page) {
            URL += '&page=' + params.page;
        }

        if (params.with_genres) {
            let filter_name = '&with_genres=';

            for (let i = 0; i < params.with_genres.length; i++) {
                if (i !== (params.with_genres.length - 1)) {
                    filter_name += params.with_genres[i].id + ',';
                } else {
                    filter_name += params.with_genres[i].id;
                }
            }

            URL += filter_name;
        }
    }    
    
    return axios.get(
        URL
    )
}

// ищет любые фильмы совпадающие с введенной строкой поиска
export function searchMovies(params) {
    let URL = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + params.query;

    if (params) {
        if (params.page) {
            URL += '&page=' + params.page;
        }
    }

    return axios.get(
        URL
    )
}

// получает 1 фильм который равен передаваемому ID
export function getMovie(id_movie) {
    let URL = 'https://api.themoviedb.org/3/movie/' + id_movie + '?api_key=' + API_KEY;

    return axios.get(
        URL
    )
}

// получает список всех жанров
export function getGenres() {
    let URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY;

    return axios.get(
        URL
    )
}

