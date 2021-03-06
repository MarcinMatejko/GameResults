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
            <h1 className='large mt-4'>Lista gier</h1>
            {loading ? (
              <Spinner />
            ) : (
              <div className='games-box mb-6'>
                {games.map((game) => (
                  <div key={game._id}>
                    <Link to={`/games/${game._id}`} className='game-item'>
                      <h3>{game.title}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* <Link className='btn btn-primary btn-add-game mb-6' to='add-game'>
              Dodaj nową Grę
            </Link> */}
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
