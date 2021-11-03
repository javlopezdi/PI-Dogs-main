import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTemperaments, filterByTemperament } from '../../actions';

const TemperFilter = ({
  temperaments,
  chosenTemperament,
  fetchTemperaments,
  filterByTemperament,
}) => {
  useEffect(() => {
    fetchTemperaments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    filterByTemperament(e.target.value);
  };

  return (
    <div>
      <label>Filter by temperament: </label>
      <select defaultValue={chosenTemperament} onChange={handleChange}>
        <option value="All">All</option>
        {temperaments.map((temperament, index) => {
          return (
            <option key={index} value={temperament}>
              {temperament}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    temperaments: state.displayedBreeds.temperaments,
    chosenTemperament: state.displayedBreeds.temperamentOption,
  };
};

export default connect(mapStateToProps, {
  fetchTemperaments,
  filterByTemperament,
})(TemperFilter);
