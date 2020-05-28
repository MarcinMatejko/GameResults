import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../auth/Login';
import logo from '../../img/logo.png';
import Scroll from './Scroll';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='landing-inner'>
            <div className='landing-left'>
              <img src={logo} alt='logo' className='logo mt-1' />

              <p className='large landing-large'>
                Zapisuj wyniki swoich ulubionych gier i miej do nich dostęp
                zawsze i wszędzie
              </p>
            </div>
            <div className='landing-right'>
              <Login />
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
