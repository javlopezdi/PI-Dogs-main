import {
  FETCH_BREEDS,
  FILTER_BY_TEMPERAMENT,
  SEARCH_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  CREATE_BREED,
  FETCH_TEMPERAMENTS,
  FILTER_BY_ORIGIN,
} from '../actions/types';

const INITIAL_STATE = {
  displayedBreeds: [],
  temperaments: [],
  orderOption: 0,
  originOption: 'All',
  temperamentOption: 'All',
  searchedName: '',
};

const sortByName = (displayedBreeds, payload) => {
  return displayedBreeds.sort((a, b) => {
    if (payload) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    } else {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    }
  });
};

const sortByWeight = (displayedBreeds, payload) => {
  return displayedBreeds.sort((a, b) => {
    const maxWeightA = parseInt(a.weight.split(' ')[2]);
    const maxWeightB = parseInt(b.weight.split(' ')[2]);
    return payload ? maxWeightA - maxWeightB : maxWeightB - maxWeightA;
  });
};

const applyCurrentTemperamentFilter = (displayedBreeds, temperamentOption) => {
  return temperamentOption === 'All'
    ? displayedBreeds
    : displayedBreeds.filter(
        (breed) =>
          breed.temperament !== undefined &&
          breed.temperament.includes(temperamentOption)
      );
};

const applyCurrentOriginFilter = (displayedBreeds, originOption) => {
  return originOption === 'All'
    ? displayedBreeds
    : displayedBreeds.filter((breed) => {
        if (originOption === 'User') return breed.id.toString().length > 3;
        return breed.id.toString().length <= 3;
      });
};

const applyCurrentSearchName = (displayedBreeds, searchedName) => {
  return searchedName === ''
    ? displayedBreeds
    : displayedBreeds.filter((breed) => {
        return breed.name.toUpperCase().includes(searchedName.toUpperCase());
      });
};

const applyCurrentSort = (filteredBreeds, orderOption) => {
  switch (orderOption) {
    case 0:
      return sortByName(filteredBreeds, true);
    case 1:
      return sortByName(filteredBreeds, false);
    case 2:
      return sortByWeight(filteredBreeds, true);
    default:
      return sortByWeight(filteredBreeds, false);
  }
};

const displayedBreedsReducer = (state = INITIAL_STATE, action) => {
  let displayedBreeds = action.payload?.displayedBreeds;
  switch (action.type) {
    case FETCH_TEMPERAMENTS:
      return {
        ...state,
        temperaments: [...action.payload],
      };
    case FETCH_BREEDS:
      return {
        ...state,
        displayedBreeds: action.payload,
      };
    case CREATE_BREED:
      return {
        ...state,
        displayedBreeds: [...state.displayedBreeds, action.payload],
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        orderOption: action.payload ? 0 : 1,
        displayedBreeds: [...sortByName(state.displayedBreeds, action.payload)],
      };
    case ORDER_BY_WEIGHT:
      return {
        ...state,
        orderOption: action.payload ? 2 : 3,
        displayedBreeds: [
          ...sortByWeight(state.displayedBreeds, action.payload),
        ],
      };
    case FILTER_BY_TEMPERAMENT:
      displayedBreeds = applyCurrentSort(displayedBreeds, state.orderOption);
      displayedBreeds = applyCurrentOriginFilter(
        displayedBreeds,
        state.originOption
      );
      displayedBreeds = applyCurrentSearchName(
        displayedBreeds,
        state.searchedName
      );
      return {
        ...state,
        displayedBreeds: [...displayedBreeds],
        temperamentOption: action.payload.temperament,
      };
    case FILTER_BY_ORIGIN:
      displayedBreeds = applyCurrentSort(displayedBreeds, state.orderOption);
      displayedBreeds = applyCurrentSearchName(
        displayedBreeds,
        state.searchedName
      );
      displayedBreeds = applyCurrentTemperamentFilter(
        displayedBreeds,
        state.temperamentOption
      );
      return {
        ...state,
        displayedBreeds: [...displayedBreeds],
        originOption: action.payload.origin,
      };
    case SEARCH_BY_NAME:
      displayedBreeds = applyCurrentSort(displayedBreeds, state.orderOption);
      displayedBreeds = applyCurrentOriginFilter(
        displayedBreeds,
        state.originOption
      );
      displayedBreeds = applyCurrentTemperamentFilter(
        displayedBreeds,
        state.temperamentOption
      );
      return {
        ...state,
        displayedBreeds: [...displayedBreeds],
        searchedName: action.payload.name,
      };
    default:
      return state;
  }
};

export default displayedBreedsReducer;
