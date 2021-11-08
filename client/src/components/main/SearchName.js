import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchByName } from '../../actions';
import './SearchName.css';

const SearchName = ({ searchByName }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchByName(name);
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();
    searchByName(name);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form className="searchName" onSubmit={handleSubmit}>
      <input
        className="searchNameInput"
        onChange={handleChange}
        value={name}
        placeholder="Search by breed"
      />
      <button className="searchNameButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#FFF"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default connect(null, { searchByName })(SearchName);
