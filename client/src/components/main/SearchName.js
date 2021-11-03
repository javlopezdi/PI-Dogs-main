import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchByName } from '../../actions';

const SearchName = ({ searchByName }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchByName(name);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={name}
        placeholder="Search by breed"
      />
      <button>Search</button>
    </form>
  );
};

export default connect(null, { searchByName })(SearchName);
