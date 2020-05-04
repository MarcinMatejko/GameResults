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
    <Fragment>
      <h1>Dashoard</h1>
      <p>Cześć, {user && user.name}</p>

      <p>Nie posiadasz żadnych graczy.</p>
      <Link to='/create-player' className='btn btn-primary'>
        Stwórz gracza
      </Link>
      {/* {user.players.length === 0 ? (
        <Fragment>Twoi gracze to:</Fragment>
      ) : (
        <Fragment>Nie masz żadnych graczy</Fragment>
      )} */}
    </Fragment>
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
