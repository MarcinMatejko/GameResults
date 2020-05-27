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
              <option value=''>Kolor Gracza:</option>
              <option value='#003c8f'>niebieski</option>
              <option value='#005005'>zielony</option>
              <option value='#ffea00'>żółty</option>
              <option value='#d50000'>czerwony</option>
              <option value='#000000'>czarny</option>
              <option value='#fff'>biały</option>
              <option value='#260e04'>brązowy</option>
              <option value='#38006b'>fioletowy</option>
              <option value='#ad1457'>różowy</option>
              <option value='#424242'>szary</option>
              <option value='#bf360c'>pomarańczowy</option>
              <option value='#c67c00'>złoty</option>
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
          type='submit'
          className='btn btn-primary btn-block mb-6'
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
