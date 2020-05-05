import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PlayerItem from './PlayerItem';
import { getPlayers } from '../../actions/player';

const Players = ({ getPlayers, player: { players, loading } }) => {
  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Gracze</h1>
      <p>Oto lista twoich graczy</p>
      {/*Players Form */}
      <div className='players'>
        {players.map((player) => (
          <PlayerItem key={player._id} player={player} />
        ))}
      </div>
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
