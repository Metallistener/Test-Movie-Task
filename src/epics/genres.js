import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getGenres } from '../services/http/movies';
import { loading_genres_success } from '../actions/genres';

export const loadGenresEpic = action$ => action$.pipe(
    ofType('LOAD_GENRES'),
    mergeMap((data) => 
        getGenres()
        .then((response) => loading_genres_success(response.data.genres))
        .catch((error) => console.log('error'))
    )
);