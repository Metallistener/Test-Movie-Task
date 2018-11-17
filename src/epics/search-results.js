import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { searchMovies } from '../services/http/movies';
import { loading_found_movies_success } from '../actions/search-results';

export const loadFoundMoviesEpic = action$ => action$.pipe(
    ofType('LOAD_FOUND_MOVIES'),
    mergeMap((action) => 
        searchMovies(action.params)
        .then((response) => loading_found_movies_success(response.data))
        .catch((error) => console.log('error'))
    )
);