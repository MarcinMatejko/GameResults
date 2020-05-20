import React from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => {
  return (
    <div className='instructions'>
      <div className='dark-overlay'>
        <div className='page-inner'>
          <Link className='btn btn-primary btn-back' to='/'>
            Powrót
          </Link>
          <h1 className='x-large'>Jak używać Punktatora</h1>
          <p>Dopiero to swtorze, na razie radź sobie na własną rękę.</p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
