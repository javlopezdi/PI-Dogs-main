import {
  FETCH_BREEDS,
  FILTER_BY_TEMPERAMENT,
  SEARCH_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  CREATE_BREED,
  FETCH_TEMPERAMENTS,
  FILTER_BY_ORIGIN,
  SET_PAGE,
  SET_IS_SUCCESS_MODAL_OPEN,
} from '../actions/types';

const INITIAL_STATE = {
  pageNumber: 1,
  displayedBreeds: [],
  temperaments: [],
  orderOption: 0,
  originOption: 'All',
  temperamentOption: 'All',
  searchedName: '',
  isSuccessModalOpen: false,
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
    const minWeightA = parseInt(a.weight.split(' ')[0]);
    const minWeightB = parseInt(b.weight.split(' ')[0]);
    if (isNaN(minWeightA)) return 1;
    if (isNaN(minWeightB)) return -1;
    const maxWeightA = parseInt(a.weight.split(' ')[2]);
    const maxWeightB = parseInt(b.weight.split(' ')[2]);
    let meanWeightA = 0;
    let meanWeightB = 0;
    isNaN(maxWeightA)
      ? (meanWeightA = minWeightA)
      : (meanWeightA = (maxWeightA + minWeightA) / 2);
    isNaN(maxWeightB)
      ? (meanWeightB = minWeightB)
      : (meanWeightB = (maxWeightB + minWeightB) / 2);
    return payload ? meanWeightA - meanWeightB : meanWeightB - meanWeightA;
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
  let numberOfPages = 0;
  let pageNumber = state.pageNumber || 1;
  switch (action.type) {
    case FETCH_TEMPERAMENTS:
      return {
        ...state,
        temperaments: [...action.payload],
      };
    case FETCH_BREEDS:
      action.payload = sortByName(action.payload, true);
      return {
        ...state,
        displayedBreeds: action.payload,
      };
    case CREATE_BREED:
      return {
        ...state,
        displayedBreeds: [...state.displayedBreeds, action.payload],
        isSuccessModalOpen: true,
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
      numberOfPages = Math.ceil(displayedBreeds.length / 8);
      if (pageNumber > numberOfPages) pageNumber = numberOfPages;
      return {
        ...state,
        displayedBreeds: [...displayedBreeds],
        temperamentOption: action.payload.temperament,
        pageNumber,
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
      numberOfPages = Math.ceil(displayedBreeds.length / 8);
      if (pageNumber > numberOfPages) pageNumber = numberOfPages;
      return {
        ...state,
        displayedBreeds: [...displayedBreeds],
        originOption: action.payload.origin,
        pageNumber,
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
      numberOfPages = Math.ceil(displayedBreeds.length / 8);
      if (pageNumber > numberOfPages && numberOfPages !== 0)
        pageNumber = numberOfPages;
      return {
        ...state,
        displayedBreeds: [...displayedBreeds],
        searchedName: action.payload.name,
        pageNumber,
      };
    case SET_PAGE:
      return {
        ...state,
        pageNumber: action.payload,
      };
    case SET_IS_SUCCESS_MODAL_OPEN:
      return {
        ...state,
        isSuccessModalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default displayedBreedsReducer;
