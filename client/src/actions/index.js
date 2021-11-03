import {
  FETCH_BREEDS,
  SET_PAGE,
  ORDER_BY_WEIGHT,
  ORDER_BY_NAME,
  SEARCH_BY_NAME,
  FETCH_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT,
  FETCH_BREED,
  CREATE_BREED,
  FILTER_BY_ORIGIN,
} from './types';
import dogsApi from '../apis/dogsApi';
import history from '../history';

export const fetchBreeds = () => async (dispatch, getState) => {
  const { data } = await dogsApi.get('/dogs');
  dispatch({ type: FETCH_BREEDS, payload: data });
};

export const fetchBreed = (id) => async (dispatch) => {
  const { data } = await dogsApi.get(`/dogs/${id}`);
  dispatch({ type: FETCH_BREED, payload: data });
};

export const fetchTemperaments = () => async (dispatch) => {
  const { data } = await dogsApi.get('/temperaments');
  dispatch({ type: FETCH_TEMPERAMENTS, payload: data });
};

export const setPage = (pageNumber) => {
  return {
    type: SET_PAGE,
    payload: pageNumber,
  };
};

export const orderByWeight = (isAscendant) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload: isAscendant,
  };
};

export const orderByName = (isAscendant) => {
  return {
    type: ORDER_BY_NAME,
    payload: isAscendant,
  };
};

export const searchByName = (name) => async (dispatch, getState) => {
  const displayedBreeds = Object.values(getState().breeds).filter((breed) => {
    if (name === '') return true;
    return (
      breed.name !== undefined &&
      breed.name.toUpperCase().includes(name.toUpperCase())
    );
  });
  const payload = {
    displayedBreeds,
    name,
  };
  dispatch({ type: SEARCH_BY_NAME, payload });
};

export const filterByTemperament = (temperament) => (dispatch, getState) => {
  const displayedBreeds = Object.values(getState().breeds).filter((breed) => {
    if (temperament === 'All') return true;
    return (
      breed.temperament !== undefined && breed.temperament.includes(temperament)
    );
  });
  const payload = {
    displayedBreeds,
    temperament,
  };
  dispatch({ type: FILTER_BY_TEMPERAMENT, payload });
};

export const filterByOrigin = (origin) => (dispatch, getState) => {
  const displayedBreeds = Object.values(getState().breeds).filter((breed) => {
    if (origin === 'All') return true;
    if (origin === 'User') return breed.id.toString().length > 3;
    return breed.id.toString().length <= 3;
  });
  const payload = {
    displayedBreeds,
    origin,
  };
  dispatch({ type: FILTER_BY_ORIGIN, payload });
};

export const createBreed = (input) => async (dispatch) => {
  const { data } = await dogsApi.post('/dog', input);
  dispatch({ type: CREATE_BREED, payload: data });
  history.push('/dogs');
};
