import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='page-inner'>
          <h1 className='x-large'>Punktator</h1>
          <p className='lead'>
            Zapisuj wyniki swoich ulubionych gier i miej do nich dostęp zawsze i
            wszędzie
          </p>
          <div className='buttons'>
            <Link to='/login' className='btn btn-primary margin-x-1'>
              Zaloguj
            </Link>
            <Link to='/register' className='btn btn-primary margin-x-1'>
              Załóż konto
            </Link>
            <Link to='/instructions' className='btn btn-primary margin-1'>
              Jak korzystać?
            </Link>
          </div>
        </div>
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
