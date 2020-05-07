import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerItem from './PlayerItem';
import PlayerForm from './PlayerForm';
import Spinner from '../layout/Spinner';
import { getPlayers } from '../../actions/player';

const Players = ({ getPlayers, player: { players, loading } }) => {
  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <Fragment>
      <h1>Gracze</h1>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3>Oto lista twoich graczy:</h3>
          <div className='players'>
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
    </Fragment>
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
