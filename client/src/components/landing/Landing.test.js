import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Landing from './Landing';

configure({ adapter: new Adapter() });

describe('<Landing />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  it('Debe tener una imagen', () => {
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('Debe tener un Link a la ruta principal /dogs', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/dogs');
  });
});
