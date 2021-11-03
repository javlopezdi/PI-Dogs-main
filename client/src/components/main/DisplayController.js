import React from 'react';
import SearchName from './SearchName';
import TemperFilter from './TemperFilter';
import OriginFilter from './OriginFilter';
import Sorter from './Sorter';

const DisplayController = () => {
  return (
    <div>
      <SearchName />
      <Sorter />
      <TemperFilter />
      <OriginFilter />
    </div>
  );
};

export default DisplayController;
