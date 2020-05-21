import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePlayer } from '../../actions/player';
import { Trash2 } from 'react-feather';

const PlayerItem = ({
  deletePlayer,
  auth,
  player: { _id, playerName, age, color },
}) => (
  <div className='player'>
    <div className='player-info'>
      <h2 className='player-name'>{playerName}</h2>
      <div
        className='player-color'
        style={{
          backgroundColor: `${color}`,
          border: '1px solid black',
          height: '1rem',
          width: '100%',
        }}
      ></div>
      <p>Wiek: {age}</p>
    </div>

    <button
      onClick={(e) => deletePlayer(_id)}
      type='button'
      className='btn btn-danger btn-delete btn-delete-player'
    >
      <Trash2 className='trash' />
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
