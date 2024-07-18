
import React from 'react';

interface CardProps {
  color: string;
  title: string;
  linkText: string;
}

const Card: React.FC<CardProps> = ({ color, title, linkText }) => {
  return (
    <div className={`bg-${color}-500 text-white p-4 rounded-lg shadow-lg`}>
      <h3 className="text-xl font-bold">{title}</h3>
      
    </div>
  );
};

export default Card;
