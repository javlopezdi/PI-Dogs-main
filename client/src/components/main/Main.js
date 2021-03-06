import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBreeds } from '../../actions';
import './Main.css';
import DogCard from './DogCard';
import PageController from './PageController';
import DisplayController from './DisplayController';
import SadDog from './SadDog.png';
import Spinner from '../utils/Spinner';

export const Main = ({ breeds, fetchBreeds, pageNumber, displayedBreeds }) => {
  useEffect(() => {
    if (!displayedBreeds.length) fetchBreeds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filterByPage = (displayedBreeds) => {
    const startIndex = pageNumber * 8 - 8;
    const endIndex = pageNumber * 8 - 1;
    return displayedBreeds.filter(
      (breed, index) => index >= startIndex && index <= endIndex
    );
  };

  const renderDogCards = (displayedBreeds) => {
    // Filter by page and render
    displayedBreeds = filterByPage(displayedBreeds);
    return displayedBreeds.map((breed) => {
      return (
        <DogCard
          id={breed.id}
          key={breed.id}
          name={breed.name}
          image={breed.image}
          temperament={breed.temperament}
          weight={breed.weight}
        />
      );
    });
  };

  return (
    <div>
      <DisplayController />
      <div className="mainContainer">
        {breeds.length ? (
          displayedBreeds.length ? (
            <div className="dogCardsGrid">
              {displayedBreeds.length && renderDogCards(displayedBreeds)}
            </div>
          ) : (
            <div className="sadDogContainer">
              <img className="sadDogImage" alt="Sad dog" src={SadDog} />
              <div className="sadDogText">Sorry, we could not find any dog</div>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </div>
      <PageController />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    breeds: Object.keys(state.breeds),
    displayedBreeds: state.displayedBreeds.displayedBreeds,
    pageNumber: state.displayedBreeds.pageNumber,
  };
};

export default connect(mapStateToProps, { fetchBreeds })(Main);
