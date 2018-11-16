import { API_KEY } from '../../settings/settings';
const axios = require('axios');

// получает список фильмов
export function getMovies(params) {
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY;

    if (params) {
        if (params.page) {
            url += '&page=' + params.page;
        }
    }    
    
    return axios.get(
        url
    )
}

export function getRecommendationMovies(params) {
    let url = 'https://api.themoviedb.org/3/movie/' + params.id_movie + '/recommendations?api_key=' + API_KEY;

    return axios.get(   
        url
    )
}

// ищет любые фильмы совпадающие с введенной строкой поиска
export function searchMovies(params) {
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + params.query;

    if (params) {
        if (params.page) {
            url += '&page=' + params.page;
        }
    }

    return axios.get(
        url
    )
}

// получает 1 фильм который равен передаваемому ID
export function getMovie(params) {
    let url = 'https://api.themoviedb.org/3/movie/' + params.id_movie + '?api_key=' + API_KEY;

    return axios.get(
        url
    )
}

// получает список всех жанров
export function getGenres() {
    let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY;

    return axios.get(
        url
    )
}

