import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUserGames } from '../../actions/userGame';
import Scroll from '../layout/Scroll';

const UserGames = ({ getUserGames, userGame: { userGames, loading } }) => {
  useEffect(() => {
    getUserGames();
  }, [getUserGames]);

  return (
    <section className='games'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='games-inner'>
            <h1 className='large'>Lista twoich ulubionych gier</h1>
            {loading ? (
              <Spinner />
            ) : (
              <div className='games-box'>
                {userGames.map((game) => (
                  <div key={game._id}>
                    <Link to={`/user-games/${game._id}`} className='game-item'>
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
              <Link className='btn btn-primary margin-1' to='add-user-game'>
                Dodaj Grę do ulubionych
              </Link>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

UserGames.propTypes = {
  getUserGames: PropTypes.func.isRequired,
  userGame: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userGame: state.userGame,
});

export default connect(mapStateToProps, { getUserGames })(UserGames);
