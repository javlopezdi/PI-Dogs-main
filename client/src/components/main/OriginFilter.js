import React from 'react';
import { connect } from 'react-redux';
import { filterByOrigin } from '../../actions';
import './OriginFilter.css';

const OriginFilter = ({ originOption, filterByOrigin }) => {
  const handleChange = (e) => {
    filterByOrigin(e.target.value);
  };

  return (
    <div className="originFilter">
      <label className="originFilterLabel">Filter by Origin: </label>
      <select
        className="originFilterSelect"
        onChange={handleChange}
        defaultValue={originOption}
      >
        <option value="All">All</option>
        <option value="User">Added By User</option>
        <option value="Original">Original</option>
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    originOption: state.displayedBreeds.originOption,
  };
};

export default connect(mapStateToProps, { filterByOrigin })(OriginFilter);
