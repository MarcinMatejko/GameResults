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
      <h1>Punktator</h1>
      <p>
        Zapisuj wyniki swoich ulubionych gier i miej do nich dostęp zawsze i
        wszędzie
      </p>
      <div className='buttons'>
        <Link to='/login' className='btn btn-primary'>
          Zaloguj
        </Link>
        <Link to='/register' className='btn btn-primary'>
          Załóż konto
        </Link>
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
