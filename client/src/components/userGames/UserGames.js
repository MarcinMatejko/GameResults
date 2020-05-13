import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUserGames } from '../../actions/userGame';

const UserGames = ({ getUserGames, userGame: { userGames, loading } }) => {
  useEffect(() => {
    getUserGames();
  }, [getUserGames]);

  return (
    <Fragment>
      <h1>Lista twoich ulubionych gier</h1>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            className='games'
            style={{
              border: 'solid 1px blue',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            {userGames.map((game) => (
              <h3
                style={{
                  border: 'solid 1px green',
                  padding: '0.5rem',
                  margin: '0.5rem 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                key={game._id}
              >
                {game.title}
                <Link
                  style={{
                    margin: '1rem',
                    textAlign: 'center',
                  }}
                  to={`/user-games/${game._id}`}
                  className='btn btn-primary'
                >
                  Szczegóły
                </Link>
              </h3>
            ))}
          </div>
        </Fragment>
      )}
      <Link className='btn btn-primary' to='add-user-game'>
        Dodaj Grę do ulubionych
      </Link>

      <Link className='btn btn-primary' to='dashboard'>
        Powrót
      </Link>
    </Fragment>
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
