import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserGame } from '../../actions/userGame';
import { Link } from 'react-router-dom';

const UserGameForm = ({ addUserGame }) => {
  const [formData, setFormData] = useState({
    title: '',
    minPlayers: '',
    maxPlayers: '',
    minAge: '',
  });

  const { title, minPlayers, maxPlayers, minAge } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addUserGame({ title, minPlayers, maxPlayers, minAge });
  };
  return (
    <Fragment>
      <h3>Dodaj nową grę</h3>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Tytuł Gry'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Minimalny liczba Graczy'
            name='minPlayers'
            value={minPlayers}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Maksymalny liczba Graczy'
            name='maxPlayers'
            value={maxPlayers}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Minimalny wiek gracza'
            name='minAge'
            value={minAge}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <input
          style={{ margin: '1rem 0' }}
          type='submit'
          className='btn btn-primary'
          value='Dodaj Grę'
        />
      </form>
      <Link className='btn btn-primary' to='user-games'>
        Powrót
      </Link>
    </Fragment>
  );
};

UserGameForm.propTypes = {
  addUserGame: PropTypes.func.isRequired,
};

export default connect(null, { addUserGame })(UserGameForm);
