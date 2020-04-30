import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <h1>Punktator</h1>
      <p>
        Zapisuj wyniki swoich ulubionych gier i miej do nich dostęp zawsze i
        wszędzie
      </p>
      <div className='buttons'>
        <Link to='/login' className='btn btn-login'>
          Zaloguj
        </Link>
        <Link to='/register' className='btn btn-register'>
          Załóż konto
        </Link>
      </div>
    </section>
  );
};

export default Landing;
