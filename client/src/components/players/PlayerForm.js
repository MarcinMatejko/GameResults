import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player';

const PlayerForm = ({ addPlayer }) => {
  const [text, setText] = useState('');

  return <div></div>;
};

PlayerForm.propTypes = {
  addPlayer: PropTypes.func.isRequired,
};

export default connect(null, { addPlayer })(PlayerForm);
