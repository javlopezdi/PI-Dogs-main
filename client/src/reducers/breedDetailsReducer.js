import { CLEAN_BREED, FETCH_BREED } from '../actions/types';

const breedDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BREED:
      return { ...action.payload };
    case CLEAN_BREED:
      return {};
    default:
      return state;
  }
};

export default breedDetailsReducer;
