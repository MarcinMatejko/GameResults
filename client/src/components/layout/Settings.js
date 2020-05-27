import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { LogOut, UserX, Edit } from 'react-feather';
import { deleteAccount } from '../../actions/profile';

const Settings = ({ deleteAccount, auth: { user }, logout }) => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='page-inner'>
          <h1 className='x-large'>Ustawienia</h1>
          <Link onClick={logout} to='/' className='btn btn-settings'>
            Wyloguj
            <LogOut className='margin-r-1' size={20} />
          </Link>
          <button className='btn btn-settings' onClick={() => deleteAccount()}>
            Usuń kotno
            <UserX className='margin-r-1' size={20} />
          </button>

          <a
            href='https://marcinmatejko.pl'
            target='_blank'
            rel='noopener'
            className='btn btn-settings'
          >
            Autor: Marcin Matejko
            <Edit className='margin-r-1' size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

Settings.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, deleteAccount })(Settings);
