import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Home,
  Users,
  Clipboard,
  Heart,
  PlusCircle,
  UserPlus,
  HelpCircle,
} from 'react-feather';

const Navbar = ({ auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link className='nav-item' to='/players'>
          <Users />
          Gracze
        </Link>
      </li>
      <li>
        <Link className='nav-item' to='/games'>
          <Clipboard />
          Gry
        </Link>
      </li>
      <li>
        <Link className='nav-item' to='/user-games'>
          <Heart />
          Moje Gry
        </Link>
      </li>
      <li>
        <Link className='nav-item' to='/new-result'>
          <PlusCircle />
          Nowy Wynik
        </Link>
      </li>
      <li>
        <Link className='nav-item' to='/instructions'>
          <HelpCircle /> Jak używać
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link className='nav-item' to='/register'>
          <UserPlus /> Załóż Konto
        </Link>
      </li>
      <li>
        <Link className='nav-item' to='/instructions'>
          <HelpCircle /> Jak używać
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <p>
        <Link className='nav-item' to='/'>
          <Home />
          Punktator
        </Link>
      </p>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
