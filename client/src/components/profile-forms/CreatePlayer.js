import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreatePlayer = (props) => {
  const [formData, setFormData] = useState({
    playerName: '',
    age: '',
    color: '',
  });

  const { playerName, age, color } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1>Stwórz gracza</h1>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Imię gracza'
            name='playerName'
            value={playerName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Wiek gracza'
            name='age'
            value={age}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Kolor gracza'
            name='color'
            value={color}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' />
      </form>
    </Fragment>
  );
};

CreatePlayer.propTypes = {};

export default CreatePlayer;
