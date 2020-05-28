import React from 'react';
import Scroll from './Scroll';

const NewResult = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='page-inner'>
            <h1 className='large mt-4'>Dodaj wynik Gry</h1>
            <p className='lead mb-6'>
              Ta część aplikacji jest ciągle w budowie. Za niedługo powinna być
              gotowa.
            </p>
          </div>
        </Scroll>
      </div>
    </section>
  );
};

export default NewResult;
