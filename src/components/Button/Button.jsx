import React from 'react';
import s from './Button.module.css';

function Button({ loag }) {
  return (
    <button
      className={s.Button}
      aria-label="Load more"
      type="button"
      onClick={loag}
    >
      Load more
    </button>
  );
}

export default Button;