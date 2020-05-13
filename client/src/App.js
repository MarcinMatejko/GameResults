import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
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
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />

              <PrivateRoute exact path='/players' component={Players} />
              <PrivateRoute exact path='/games' component={Games} />
              <PrivateRoute exact path='/user-games' component={UserGames} />
              <PrivateRoute exact path='/games/:id' component={Game} />
              <PrivateRoute exact path='/user-games/:id' component={UserGame} />
              <PrivateRoute exact path='/add-game' component={GameForm} />
              <PrivateRoute
                exact
                path='/add-user-game'
                component={UserGameForm}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
