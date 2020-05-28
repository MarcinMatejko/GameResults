import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserGame } from '../../actions/userGame';
import { Redirect } from 'react-router-dom';
import Scroll from '../layout/Scroll';

const UserGameForm = ({ addUserGame, isCreated }) => {
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

  if (isCreated) {
    return <Redirect to='user-games' />;
  }
  return (
    <section className='games'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='games-inner'>
            <h3 className='large mt-4'>Dodaj nową grę</h3>
            <form className='form mb-6' onSubmit={(e) => onSubmit(e)}>
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
                className='btn btn-primary btn-block'
                value='Dodaj Grę'
              />
            </form>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

UserGameForm.propTypes = {
  addUserGame: PropTypes.func.isRequired,
  isCreated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isCreated: state.userGame.isCreated,
});

export default connect(mapStateToProps, { addUserGame })(UserGameForm);
