import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player';

const PlayerForm = ({ addPlayer }) => {
  const [formData, setFormData] = useState({
    playerName: '',
    age: '',
    color: '',
  });

  const { playerName, age, color } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addPlayer({ playerName, age, color });
  };

  return (
    <Fragment>
      <h3>Dodaj nowego gracza</h3>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Imię gracza'
            name='playerName'
            value={playerName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Wiek gracza'
            name='age'
            value={age}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <label>
            <select value={color} name='color' onChange={(e) => onChange(e)}>
              <option value='niebieski'>niebieski</option>
              <option value='zielony'>zielony</option>
              <option value='żółty'>żółty</option>
              <option value='czerwony'>czerwony</option>
              <option value='czarny'>czarny</option>
              <option value='biały'>biały</option>
              <option value='brązowy'>brązowy</option>
              <option value='fioletowy'>fioletowy</option>
              <option value='różowy'>różowy</option>
              <option value='szary'>szary</option>
              <option value='pomarańczowy'>pomarańczowy</option>
              <option value='złoty'>złoty</option>
            </select>
          </label>
        </div>

        {/* <div className='form-group'>
          <input
            type='text'
            placeholder='Kolor gracza'
            name='color'
            value={color}
            onChange={(e) => onChange(e)}
          />
        </div> */}
        <input
          style={{ margin: '1rem 0' }}
          type='submit'
          className='btn btn-primary'
          value='Dodaj gracza'
        />
      </form>
    </Fragment>
  );
};

PlayerForm.propTypes = {
  addPlayer: PropTypes.func.isRequired,
};

export default connect(null, { addPlayer })(PlayerForm);
