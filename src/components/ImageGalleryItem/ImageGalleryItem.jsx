import React from 'react';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  contact: { name, number, id },
  onRemoveContact,
}) {
  return (
    <li className={s.item}>
      <span>
        {name}: {number}
      </span>
      <button
        className={s.button}
        type="button"
        data-id={id}
        onClick={e => {
          onRemoveContact(e.target.dataset.id);
        }}
      >
        delete
      </button>
    </li>
  );
}

export default ImageGalleryItem;