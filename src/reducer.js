import { combineReducers } from 'redux';
import {load_popular_movies} from './reducers/popular';
import {detailed_movie, recommended_movies} from './reducers/detailed';
import {found_movies} from './reducers/search-results';
import {genres} from './reducers/genres';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    load_popular_movies,
    genres,
    detailed_movie,
    recommended_movies,
    found_movies
})