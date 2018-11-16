import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import reducer from './reducer';
import { loadPopularMoviesEpic } from './epics/popular';
import { loadGenresEpic } from './epics/genres';
import { loadMovieDetailsEpic, loadRecommendedMoviesEpic } from './epics/detailed';

const roomEpics = combineEpics(
    loadPopularMoviesEpic,
    loadGenresEpic,
    loadMovieDetailsEpic,
    loadRecommendedMoviesEpic
)
const epicMiddleware = createEpicMiddleware();
const enhancer = applyMiddleware(epicMiddleware);
export const store = createStore(reducer, enhancer);

epicMiddleware.run(roomEpics);
