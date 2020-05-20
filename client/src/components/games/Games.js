import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Scroll from '../layout/Scroll';
import { getGames } from '../../actions/game';

const Games = ({ getGames, game: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <section className='games'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='games-inner'>
            <h1 className='large'>Lista dostępnych gier</h1>
            {loading ? (
              <Spinner />
            ) : (
              <div className='games-box'>
                {games.map((game) => (
                  <div key={game._id}>
                    <Link to={`/games/${game._id}`} className='game-item'>
                      <h3>{game.title}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <div className='buttons'>
              <Link className='btn btn-primary margin-1' to='dashboard'>
                Powrót
              </Link>
              <Link className='btn btn-primary margin-1' to='add-game'>
                Dodaj nową Grę
              </Link>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(Games);
