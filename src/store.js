import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import reducer from './reducer';
import { loadPopularMoviesEpic } from './epics/popular';

const roomEpics = combineEpics(
    loadPopularMoviesEpic
)
const epicMiddleware = createEpicMiddleware();
const enhancer = applyMiddleware(epicMiddleware);
export const store = createStore(reducer, enhancer);

epicMiddleware.run(roomEpics);

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
