import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUserGame, deleteUserGame } from '../../actions/userGame';
import { Link, Redirect } from 'react-router-dom';

const UserGame = ({
  deleteUserGame,
  isDeleted,
  getUserGame,
  userGame: { userGame, loading },
  match,
}) => {
  useEffect(() => {
    getUserGame(match.params.id);
  }, [getUserGame, match.params.id]);

  const onClick = async (e) => {
    deleteUserGame(userGame._id);
  };

  if (isDeleted) {
    return <Redirect to='/user-games' />;
  }

  return loading ? (
    <Spinner />
  ) : userGame === null ? (
    <div className='game'>
      <div className='dark-overlay'>
        <div className='game-info'>
          <h1>Nie ma takiej gry</h1>

          <Link className='btn btn-primary' to='/user-games'>
            Powrót do listy Gier
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className='game'>
      <div className='dark-overlay'>
        <div className='game-info'>
          <div>
            <h3>{userGame.title}</h3>
            <p>
              Liczba graczy: {userGame.minPlayers} - {userGame.maxPlayers}
            </p>
            <p>Gra od {userGame.minAge} lat.</p>
          </div>
          <div className='game-buttons'>
            <Link className='btn btn-primary mb-1 text-center' to='/user-games'>
              Powrót
            </Link>
            <button
              // onClick={((e) => deleteUserGame(userGame._id))}
              onClick={(e) => onClick(e)}
              type='button'
              className='btn btn-danger'
            >
              Usuń Grę
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserGame.propTypes = {
  getUserGame: PropTypes.func.isRequired,
  userGame: PropTypes.object.isRequired,
  deleteUserGame: PropTypes.func.isRequired,
  isDeleted: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userGame: state.userGame,
  isDeleted: state.userGame.isDeleted,
});

export default connect(mapStateToProps, { getUserGame, deleteUserGame })(
  UserGame
);
