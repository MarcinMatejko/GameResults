import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GameItem = ({
  auth,
  game: { _id, title, minPlayers, maxPlayers, minAge },
}) => {
  return (
    <div
      className='game'
      style={{ border: 'solid 1px blue', padding: '0.5rem', margin: '0.5rem' }}
    >
      <h3>Nazwa: {title}</h3>
      <p>
        Liczba graczy: {minPlayers} - {maxPlayers}
      </p>
      <p>Gra od {minAge} lat.</p>
    </div>
  );
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(GameItem);
