import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch,Route,HashRouter,Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import Popular from './pages/popular/popular';
import Navigation from './components/navigation/navigation';
import Detailed from './pages/detailed/detailed';
import SearchResults from './pages/search-results/search-results';
require('react-web-vector-icons/fonts');

ReactDOM.render(
    <div>
        <Provider store={store}>        
            <HashRouter>    
                <Switch>
                    <Route exact path="/home" component={Popular} />
                    <Route path="/detailed/:id" component={Detailed} />
                    <Route path="/search-results/:movie_name" component={SearchResults} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </HashRouter>
        </Provider>
    </div>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
