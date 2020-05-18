import React, { useEffect } from 'react';
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
    <section className='dashboard'>
      <div className='dark-overlay'>
        <div className='dashboard-inner'>
          <h1 className='large'>Cześć {user && user.name}</h1>
          <Link to='/players' className='btn-dashboard'>
            Lista Graczy
          </Link>
          <Link to='/games' className='btn-dashboard'>
            Lista Gier
          </Link>
          <Link to='/user-games' className='btn-dashboard'>
            Moje Gry
          </Link>
        </div>
      </div>
    </section>
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
