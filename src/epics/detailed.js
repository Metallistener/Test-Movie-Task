import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getMovie, getRecommendationMovies } from '../services/http/movies';
import { loading_movie_details_success, loading_recommended_movies_success } from '../actions/detailed';

export const loadMovieDetailsEpic = action$ => action$.pipe(
    ofType('LOAD_MOVIE_DETAILS'),
    mergeMap((action) => 
        getMovie(action.params)
        .then((response) => loading_movie_details_success(response.data))
        .catch((error) => console.log('error'))
    )
);

export const loadRecommendedMoviesEpic = action$ => action$.pipe(
    ofType('LOAD_RECOMMENDED_MOVIES'),
    mergeMap((action) => 
        getRecommendationMovies(action.params)
        .then((response) => loading_recommended_movies_success(response.data.results))
        .catch((error) => console.log('error'))
    )
);