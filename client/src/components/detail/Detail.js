import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { cleanBreed, fetchBreed } from '../../actions';
import Spinner from '../utils/Spinner';
import './Detail.css';

const Detail = ({ cleanBreed, match, fetchBreed, breedDetails }) => {
  useEffect(() => {
    fetchBreed(match.params.id);
    return cleanBreed();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!breedDetails) return <Spinner />;
  return (
    <div className="detail">
      <div className="detailImageContainer">
        <img
          className="detailImage"
          src={breedDetails.image}
          alt={breedDetails.name}
        />
      </div>
      <div className="detailInfo">
        <h2 className="detailName">{breedDetails.name}</h2>
        <div className="detailWeightContainer">
          <p className="detailWeight">Weight:</p>
          <p className="detailWeight">{breedDetails.weight} kg</p>
        </div>
        <div className="detailHeightContainer">
          <p className="detailHeight">Height:</p>
          <p className="detailHeight">{breedDetails.height} cm</p>
        </div>
        <div className="detailLifeSpanContainer">
          <p className="detailLifeSpan">Life Span:</p>
          <p className="detailLifeSpan">{breedDetails.lifeSpan}</p>
        </div>
        <p className="detailTemperament">{breedDetails.temperament}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { breedDetails: state.breedDetails };
};

export default connect(mapStateToProps, { fetchBreed, cleanBreed })(Detail);
