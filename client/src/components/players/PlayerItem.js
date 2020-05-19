import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePlayer } from '../../actions/player';

const PlayerItem = ({
  deletePlayer,
  auth,
  player: { _id, playerName, age, color },
}) => (
  <div className='player'>
    <div className='player-info'>
      <h2>Imię: {playerName}</h2>
      <p>Wiek: {age}</p>
      <p>Kolor: {color}</p>
    </div>
    <button
      onClick={(e) => deletePlayer(_id)}
      type='button'
      className='btn btn-danger btn-delete'
    >
      Usuń Gracza
    </button>
  </div>
);

PlayerItem.propTypes = {
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePlayer })(PlayerItem);
