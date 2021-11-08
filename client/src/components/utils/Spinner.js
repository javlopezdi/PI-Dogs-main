import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="loadingContainer">
      <div className="spinner"></div>
      <div className="spinnerText">Loading...</div>
    </div>
  );
};

export default Spinner;
