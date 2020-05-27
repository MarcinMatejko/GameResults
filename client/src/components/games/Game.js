import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGame } from '../../actions/game';
import { addUserGameFromGames } from '../../actions/userGame';
import { Link } from 'react-router-dom';

const Game = ({
  addUserGameFromGames,
  getGame,
  game: { game, loading },
  match,
}) => {
  useEffect(() => {
    getGame(match.params.id);
  }, [getGame, match.params.id]);

  const onClick = async (e) => {
    addUserGameFromGames(game._id);
  };
  return loading ? (
    <Spinner />
  ) : game === null ? (
    <div className='game'>
      <div className='dark-overlay'>
        <div className='game-info'>
          <h1>Nie ma takiej gry</h1>

          <Link className='btn btn-primary' to='/games'>
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
            <h3>{game.title}</h3>
            <p>
              Liczba graczy: {game.minPlayers} - {game.maxPlayers}
            </p>
            <p>Gra od {game.minAge} lat.</p>
          </div>
          <button
            onClick={(e) => onClick(e)}
            type='button'
            className='btn btn-primary'
            style={{ height: '2.5rem' }}
          >
            Dodaj do ulubionych
          </button>
        </div>
      </div>
    </div>
  );
};

Game.propTypes = {
  getGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  // userGame: PropTypes.object.isRequired,
  addUserGameFromGames: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, {
  getGame,
  addUserGameFromGames,
})(Game);
