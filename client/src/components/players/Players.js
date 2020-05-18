import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerItem from './PlayerItem';
import PlayerForm from './PlayerForm';
import Spinner from '../layout/Spinner';
import Scroll from '../layout/Scroll';
import { getPlayers } from '../../actions/player';

const Players = ({ getPlayers, player: { players, loading } }) => {
  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <section className='players'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='players-inner'>
            <h1>Gracze</h1>
            {loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <h3>Oto lista twoich graczy:</h3>
                <div>
                  {players.map((player) => (
                    <PlayerItem key={player._id} player={player} />
                  ))}
                </div>
              </Fragment>
            )}

            <PlayerForm />
            <Link className='btn btn-primary' to='dashboard'>
              Powrót
            </Link>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

Players.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, { getPlayers })(Players);
