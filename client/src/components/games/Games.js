import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGames } from '../../actions/game';

const Games = ({ getGames, game: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <Fragment>
      <h1>Lista dostępnych gier</h1>
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
            {games.map((game) => (
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
                  to={`/games/${game._id}`}
                  className='btn btn-primary'
                >
                  Szczegóły
                </Link>
              </h3>
            ))}
          </div>
        </Fragment>
      )}
      <Link className='btn btn-primary' to='add-game'>
        Dodaj nową Grę
      </Link>

      <Link className='btn btn-primary' to='dashboard'>
        Powrót
      </Link>
    </Fragment>
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
