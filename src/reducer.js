import { combineReducers } from 'redux';
import {popular_movies, popular_movies_error} from './reducers/popular';
import {detailed_movie, same_movies} from './reducers/detailed';
import {found_movies} from './reducers/search-results';
import {genres} from './reducers/genres';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    popular_movies,
    popular_movies_error,
    genres,
    detailed_movie,
    same_movies,
    found_movies
})