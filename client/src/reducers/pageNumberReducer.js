import { SET_PAGE } from '../actions/types';

const pageNumberReducer = (state = 1, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.payload;
    default:
      return state;
  }
};

export default pageNumberReducer;
