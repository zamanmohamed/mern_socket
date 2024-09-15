import React from 'react';

const ItemList = ({ items, onUpdate, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {item.name} - {item.description}
          <button onClick={() => onUpdate(item._id)}>Update</button>
          <button onClick={() => onDelete(item._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
