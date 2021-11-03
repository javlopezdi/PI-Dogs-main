import { FETCH_BREED } from '../actions/types';

const breedDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BREED:
      return { ...action.payload };
    default:
      return state;
  }
};

export default breedDetailsReducer;
