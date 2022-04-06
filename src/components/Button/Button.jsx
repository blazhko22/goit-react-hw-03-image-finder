import React from 'react';
import s from './Button.module.css';

function Button({ value, onChangeFilter }) {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        name="filter"
        type="text"
        value={value}
        onChange={event => onChangeFilter(event.target.value)}
      />
    </label>
  );
}

export default Button;