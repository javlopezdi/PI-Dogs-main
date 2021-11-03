import { combineReducers } from 'redux';
import breedDetailsReducer from './breedDetailsReducer';
import breedsReducer from './breedsReducer';
import displayedBreedsReducer from './displayedBreedsReducer';
import pageNumberReducer from './pageNumberReducer';

export default combineReducers({
  breeds: breedsReducer,
  displayedBreeds: displayedBreedsReducer,
  pageNumber: pageNumberReducer,
  breedDetails: breedDetailsReducer,
});
