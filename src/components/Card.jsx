import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 border rounded-lg shadow p-4 transition-all hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
