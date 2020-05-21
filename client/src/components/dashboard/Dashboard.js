import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { logout } from '../../actions/auth';
import { LogOut } from 'react-feather';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  logout,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='dashboard'>
      <div className='dark-overlay'>
        <div className='page-inner'>
          <Link onClick={logout} to='/' className='btn btn-danger btn-logout'>
            Wyloguj <LogOut className='margin-l-1' size={20} />
          </Link>
          <h1 className='large'>Cześć {user && user.name}</h1>
          <Link to='/players' className='btn btn-dashboard'>
            Lista Graczy
          </Link>
          <Link to='/games' className='btn btn-dashboard'>
            Lista Gier
          </Link>
          <Link to='/user-games' className='btn btn-dashboard'>
            Moje Gry
          </Link>
          <Link to='/user-games' className='btn btn-dashboard'>
            Nowy Wynik Gry
          </Link>
          <Link to='/instructions' className='btn btn-dashboard mb-6'>
            Jak korzystać?
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
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(
  Dashboard
);
