import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <p>
        <Link to='/'>Punktator</Link>
      </p>
      <ul>
        <li>
          <Link to='/register'>Zarejestruj</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/login'>Zaloguj</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
