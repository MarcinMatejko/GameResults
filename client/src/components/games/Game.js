import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGame, deleteGame } from '../../actions/game';
import { Link, Redirect } from 'react-router-dom';

const Game = ({ deleteGame, getGame, game: { game, loading }, match }) => {
  useEffect(() => {
    getGame(match.params.id);
  }, [getGame, match.params.id]);

  return loading ? (
    <Spinner />
  ) : game === null ? (
    <Fragment>
      <h1>Nie ma takiej gry</h1>
      <Link className='btn btn-primary' to='/games'>
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
          <h3>{game.title}</h3>
          <p>
            Liczba graczy: {game.minPlayers} - {game.maxPlayers}
          </p>
          <p>Gra od {game.minAge} lat.</p>
        </div>
        <button
          onClick={(e) => deleteGame(game._id)}
          type='button'
          className='btn btn-danger'
          style={{ height: '2rem' }}
        >
          Usuń Grę
        </button>
      </div>
      <Link className='btn btn-primary' to='/games'>
        Powrót
      </Link>
    </Fragment>
  );
};

Game.propTypes = {
  getGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGame, deleteGame })(Game);
