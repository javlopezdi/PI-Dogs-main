import React from 'react';
import { Link } from 'react-router-dom';
import './DogCard.css';

const DogCard = ({ image, name, weight, temperament, id }) => {
  return (
    <Link to={`/dogs/${id}`}>
      <div>
        <img className="dogCardImage" alt={`${name} avatar`} src={image} />
      </div>
      <div>
        <div>{name}</div>
        <div>{weight}</div>
        <div>{temperament}</div>
      </div>
    </Link>
  );
};

export default DogCard;
