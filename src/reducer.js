import { combineReducers } from 'redux';
import { load_popular_movies } from './reducers/popular';
import { load_movie_details, load_recommended_movies } from './reducers/detailed';
import { load_found_movies } from './reducers/search-results';
import { load_genres } from './reducers/genres';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    load_popular_movies,
    load_genres,
    load_movie_details,
    load_recommended_movies,
    load_found_movies
})