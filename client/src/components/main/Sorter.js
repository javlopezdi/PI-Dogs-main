import React from 'react';
import { connect } from 'react-redux';
import { orderByName, orderByWeight } from '../../actions';

const orderNames = [
  'Order A-Z',
  'Order Z-A',
  'Weight low to high',
  'Weight high to low',
];

const Sorter = ({ orderOption, orderByName, orderByWeight }) => {
  const handleChange = (e) => {
    const option = Number(e.target.value);
    switch (option) {
      case 0:
        orderByName(true);
        break;
      case 1:
        orderByName(false);
        break;
      case 2:
        orderByWeight(true);
        break;
      default:
        orderByWeight(false);
    }
  };

  return (
    <div>
      <label>Sort by: </label>
      <select defaultValue={orderOption} onChange={handleChange}>
        {orderNames.map((option, index) => {
          return (
            <option key={index} value={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderOption: state.displayedBreeds.orderOption,
  };
};

export default connect(mapStateToProps, { orderByName, orderByWeight })(Sorter);
