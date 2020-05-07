import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem',
        padding: '1rem',
      }}
    >
      <h1>Dashoard</h1>
      <p>Cześć, {user && user.name}</p>
      <Link
        style={{ width: '200px', margin: '1rem', textAlign: 'center' }}
        to='/players'
        className='btn btn-primary'
      >
        Lista Graczy
      </Link>
      <Link
        style={{ width: '200px', margin: '1rem', textAlign: 'center' }}
        to='/games'
        className='btn btn-primary'
      >
        Lista Gier
      </Link>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
