import React from 'react';
import { Link } from 'react-router-dom';
import './DogCard.css';

const DogCard = ({ image, name, weight, temperament, id }) => {
  return (
    <div className="dogCard">
      {/* Exposed content */}
      <div className="dogCardImageContainer">
        <img className="dogCardImage" alt={`${name} avatar`} src={image} />
        <div className="dogCardFrontContent">
          <div className="dogCardFrontName">{name}</div>
          {/* <div className="dogCardFrontWeight">{weight} kg</div>
          <div className="dogCardFrontTemperament">{temperament}</div> */}
        </div>
      </div>
      {/* Hidden content */}
      <div className="dogCardBackContent">
        <div className="dogCardBackContentInside">
          <div className="dogInfo">
            <h4 className="dogCardBackName">{name}</h4>
            <p className="dogCardBackWeight">{weight} kg</p>
            <p className="dogCardBackTemperament">{temperament}</p>
          </div>
          <Link className="detailsButton" to={`/dogs/${id}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
