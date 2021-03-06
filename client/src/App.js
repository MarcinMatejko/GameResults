import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Instructions from './components/layout/Instructions';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import NewResult from './components/layout/NewResult';
import Settings from './components/layout/Settings';
import Dashboard from './components/dashboard/Dashboard';
import Players from './components/players/Players';
import Games from './components/games/Games';
import UserGames from './components/userGames/UserGames';
import Game from './components/games/Game';
import UserGame from './components/userGames/UserGame';
import GameForm from './components/games/GameForm';
import UserGameForm from './components/userGames/UserGameForm';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className='container'>
            <Route exact path='/' component={Landing} />
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/instructions' component={Instructions} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />

              <PrivateRoute exact path='/players' component={Players} />
              <PrivateRoute exact path='/games' component={Games} />
              <PrivateRoute exact path='/user-games' component={UserGames} />
              <PrivateRoute exact path='/games/:id' component={Game} />
              <PrivateRoute exact path='/user-games/:id' component={UserGame} />
              <PrivateRoute exact path='/add-game' component={GameForm} />
              <PrivateRoute exact path='/new-result' component={NewResult} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <PrivateRoute
                exact
                path='/add-user-game'
                component={UserGameForm}
              />
            </Switch>
          </section>
          <Navbar />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
