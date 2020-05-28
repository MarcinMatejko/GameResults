import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Scroll from '../layout/Scroll';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Hasła muszą być takie same', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='page-inner'>
            <h1 className='large dashboard-h1'>Zarejestruj się</h1>
            <p className='lead'>
              Załóż darmowe konto, aby móc korzystać z serwisu.
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Imię'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                  // required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Adres Email'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  // required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Hasło'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  // minLength='6'
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Potwierdź hasło'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  // minLength='6'
                />
              </div>
              <input
                type='submit'
                className='btn btn-primary btn-block'
                value='Zarejestruj'
              />
            </form>
            <p className='mt-1 link mb-6'>
              Posiadasz konto? <Link to='/'>Zaloguj się</Link>
            </p>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
