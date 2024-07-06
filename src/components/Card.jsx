// src/components/Card.jsx
import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="min-h-3/5 mx-auto w-2/3 max-w-md rounded-lg bg-white bg-opacity-70 p-8 shadow-lg backdrop-blur-lg backdrop-filter">
      <h2 className="mb-8 text-2xl font-bold text-gray-700">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
