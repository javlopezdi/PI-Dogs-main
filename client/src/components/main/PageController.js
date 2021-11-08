import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import './PageController.css';
import { setPage } from '../../actions';

const PageController = ({ pageNumber, setPage, numberOfBreeds }) => {
  const renderOptions = () => {
    const numberOfPages = Math.ceil(numberOfBreeds / 8);
    return _.range(1, numberOfPages + 1).map((page, index) => {
      return (
        <button
          className={`pageOption ${pageNumber === page ? 'checked' : ''}`}
          key={index}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      );
    });
  };

  return <div className="pageController">{renderOptions()}</div>;
};

const mapStateToProps = (state) => {
  return {
    numberOfBreeds: state.displayedBreeds.displayedBreeds.length,
    pageNumber: state.displayedBreeds.pageNumber,
  };
};

export default connect(mapStateToProps, { setPage })(PageController);
