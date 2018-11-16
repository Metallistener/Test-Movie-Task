import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getMovies } from '../services/http/movies';
import { loading_popular_music_success } from '../actions/popular';

export const loadPopularMoviesEpic = action$ => action$.pipe(
    ofType('LOAD_POPULAR_MOVIES'),
    switchMap((data) => 
        getMovies()
        .then((response) => loading_popular_music_success(response.data))
        .catch((error) => console.log('error'))
    )
);