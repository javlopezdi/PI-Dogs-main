import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBreed } from '../../actions';
import './Detail.css';

const Detail = ({ match, fetchBreed, breedDetails }) => {
  useEffect(() => {
    fetchBreed(match.params.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div>
        <img
          className="detailImage"
          src={breedDetails.image}
          alt={breedDetails.name}
        />
      </div>
      <div>{breedDetails.name}</div>
      <div>Weight: {breedDetails.weight} kg</div>
      <div>Height: {breedDetails.height} cm</div>
      <div>Life Span: {breedDetails.lifeSpan} cm</div>
      <div>Temperament: {breedDetails.temperament}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { breedDetails: state.breedDetails };
};

export default connect(mapStateToProps, { fetchBreed })(Detail);
