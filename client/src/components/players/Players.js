import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerItem from './PlayerItem';
import PlayerForm from './PlayerForm';
import { getPlayers } from '../../actions/player';

const Players = ({ getPlayers, player: { players } }) => {
  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <Fragment>
      <h1>Gracze</h1>
      <p>Oto lista twoich graczy</p>
      <PlayerForm />
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
