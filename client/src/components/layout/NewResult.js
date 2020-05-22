import React from 'react';
import { Link } from 'react-router-dom';

const NewResult = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='page-inner'>
          <Link className='btn btn-primary btn-back' to='/'>
            Powrót
          </Link>
          <h1 className='large'>Dodaj wynik Gry</h1>
          <p className='lead'>
            Ta część aplikacji jest ciągle w budowie. Za niedługo powinna być
            gotowa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewResult;
