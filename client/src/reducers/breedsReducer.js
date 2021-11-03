import { CREATE_BREED, FETCH_BREEDS } from '../actions/types';
import _ from 'lodash';

const breedsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BREEDS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case CREATE_BREED:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default breedsReducer;
