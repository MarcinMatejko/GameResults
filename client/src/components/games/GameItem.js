import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGame } from '../../actions/game';

const GameItem = ({
  deleteGame,
  auth,
  game: { _id, title, minPlayers, maxPlayers, minAge },
}) => {
  return (
    <div
      className='game'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        border: 'solid 1px blue',
        padding: '0.5rem',
        margin: '0.5rem',
      }}
    >
      <div>
        <h3>{title}</h3>
        <p>
          Liczba graczy: {minPlayers} - {maxPlayers}
        </p>
        <p>Gra od {minAge} lat.</p>
      </div>
      <button
        onClick={(e) => deleteGame(_id)}
        type='button'
        className='btn btn-danger'
        style={{ height: '2rem' }}
      >
        Usuń Grę
      </button>
    </div>
  );
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteGame })(GameItem);
