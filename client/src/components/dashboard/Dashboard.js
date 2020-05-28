import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Settings } from 'react-feather';
import Scroll from '../layout/Scroll';

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
        <Scroll>
          <div className='page-inner'>
            <Link to='/settings' className='btn btn-dark btn-settings-icon'>
              <Settings size={30} />
            </Link>
            <h1 className='large mt-4'>Cześć {user && user.name}</h1>
            <Link to='/players' className='btn btn-dashboard'>
              Lista Graczy
            </Link>
            <Link to='/games' className='btn btn-dashboard'>
              Lista Gier
            </Link>
            <Link to='/user-games' className='btn btn-dashboard'>
              Moje Gry
            </Link>
            <Link to='/new-result' className='btn btn-dashboard'>
              Nowy Wynik Gry
            </Link>
            <Link to='/instructions' className='btn btn-dashboard mb-6'>
              Jak korzystać?
            </Link>
          </div>
        </Scroll>
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

export default connect(mapStateToProps, {
  getCurrentProfile,
})(Dashboard);
