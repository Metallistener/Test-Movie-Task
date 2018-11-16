import React, { Component } from 'react';
import { Switch,Route,HashRouter,Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../store';
import Popular from '../pages/popular/popular';
import Detailed from '../pages/detailed/detailed';
import SearchResults from '../pages/search-results/search-results';

export default class App extends Component {
  render() {
    return (
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
      </div>
    );
  }
}


