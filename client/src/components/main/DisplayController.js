import React from 'react';
import TemperFilter from './TemperFilter';
import OriginFilter from './OriginFilter';
import Sorter from './Sorter';
import './DisplayController.css';

const DisplayController = () => {
  return (
    <div className="displayController">
      <div className="displayOptionsContainer">
        <Sorter />
        <TemperFilter />
        <OriginFilter />
      </div>
    </div>
  );
};

export default DisplayController;
