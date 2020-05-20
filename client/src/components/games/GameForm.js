import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGame } from '../../actions/game';
import { Link, Redirect } from 'react-router-dom';

const GameForm = ({ addGame, isCreated }) => {
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
    addGame({ title, minPlayers, maxPlayers, minAge });
  };

  if (isCreated) {
    return <Redirect to='games' />;
  }
  return (
    <section className='games'>
      <div className='dark-overlay'>
        <div className='games-inner'>
          <Link className='btn btn-primary btn-back' to='/games'>
            Powrót
          </Link>
          <h3 className='large mt-4'>Dodaj nową grę</h3>
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
              type='submit'
              className='btn btn-primary btn-block'
              value='Dodaj Grę'
            />
          </form>
        </div>
      </div>
    </section>
  );
};

GameForm.propTypes = {
  addGame: PropTypes.func.isRequired,
  isCreated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isCreated: state.game.isCreated,
});

export default connect(mapStateToProps, { addGame })(GameForm);
