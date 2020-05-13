import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUserGame, deleteUserGame } from '../../actions/userGame';
import { Link } from 'react-router-dom';

const UserGame = ({
  deleteUserGame,
  getUserGame,
  userGame: { userGame, loading },
  match,
}) => {
  useEffect(() => {
    getUserGame(match.params.id);
  }, [getUserGame, match.params.id]);

  return loading ? (
    <Spinner />
  ) : userGame === null ? (
    <Fragment>
      <h1>Nie ma takiej gry</h1>
      <Link className='btn btn-primary' to='/user-games'>
        Powrót do listy Gier
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <div
        className='game'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          border: 'solid 1px blue',
          padding: '0.5rem',
          margin: '0.5rem',
        }}
      >
        <div>
          <h3>{userGame.title}</h3>
          <p>
            Liczba graczy: {userGame.minPlayers} - {userGame.maxPlayers}
          </p>
          <p>Gra od {userGame.minAge} lat.</p>
        </div>
        <button
          onClick={(e) => deleteUserGame(userGame._id)}
          type='button'
          className='btn btn-danger'
          style={{ height: '2rem' }}
        >
          Usuń Grę
        </button>
      </div>
      <Link className='btn btn-primary' to='/user-games'>
        Powrót
      </Link>
    </Fragment>
  );
};

UserGame.propTypes = {
  getUserGame: PropTypes.func.isRequired,
  userGame: PropTypes.object.isRequired,
  deleteUserGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userGame: state.userGame,
});

export default connect(mapStateToProps, { getUserGame, deleteUserGame })(
  UserGame
);
