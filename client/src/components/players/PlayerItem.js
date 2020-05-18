import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePlayer } from '../../actions/player';

const PlayerItem = ({
  deletePlayer,
  auth,
  player: { _id, playerName, age, color },
}) => (
  <div
    className='player'
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      border: 'solid 1px #333',
      borderRadius: '0.5rem',
      margin: '1rem 0',
      padding: '1rem',
      width: '80vw',
      backgroundColor: '#fff',
      opacity: '0.8',
      color: '#333',
    }}
  >
    <div>
      <h2>Imię: {playerName}</h2>
      <p>Wiek: {age}</p>
      <p>Kolor: {color}</p>
    </div>
    <button
      onClick={(e) => deletePlayer(_id)}
      type='button'
      className='btn btn-danger'
      style={{ height: '2rem' }}
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
