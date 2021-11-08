import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { NewBreed } from './NewBreed';

configure({ adapter: new Adapter() });

describe('<NewBreed />', () => {
  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<NewBreed />);
    });
    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "minWeight"', () => {
      expect(wrapper.find('input[name="minWeight"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "maxWeight"', () => {
      expect(wrapper.find('input[name="maxWeight"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "minHeight"', () => {
      expect(wrapper.find('input[name="minHeight"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "maxHeight"', () => {
      expect(wrapper.find('input[name="maxHeight"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "minLifeSpan"', () => {
      expect(wrapper.find('input[name="minLifeSpan"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "maxLifeSpan"', () => {
      expect(wrapper.find('input[name="maxLifeSpan"]')).toHaveLength(1);
    });
    it('Renderiza un input con la propiedad "name" igual a "image"', () => {
      expect(wrapper.find('input[name="image"]')).toHaveLength(1);
    });
    it('Renderiza un select con la propiedad "name" igual a "temperament"', () => {
      expect(wrapper.find('select[name="temperament"]')).toHaveLength(1);
    });
  });

  describe('Manejo de inputs con estado', () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, 'useState');
      useStateSpy.mockImplementation((init) => [init, useState]);
      wrapper = shallow(<NewBreed />);
    });

    describe('Name input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de name', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="name"]').simulate('change', {
          target: { name: 'name', value: 'My new value' },
        });
        expect(useState).toHaveBeenCalledWith({
          name: 'My new value',
          temperament: [],
          image: '',
          minHeight: '',
          maxHeight: '',
          minWeight: '',
          maxWeight: '',
          minLifeSpan: '',
          maxLifeSpan: '',
        });
      });
    });

    describe('MinHeight input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de minHeight', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="minHeight"]').simulate('change', {
          target: { name: 'minHeight', value: 10 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          temperament: [],
          image: '',
          minHeight: 10,
          maxHeight: '',
          minWeight: '',
          maxWeight: '',
          minLifeSpan: '',
          maxLifeSpan: '',
        });
      });
    });
    describe('MaxHeight input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de maxHeight', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="maxHeight"]').simulate('change', {
          target: { name: 'maxHeight', value: 10 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          temperament: [],
          image: '',
          minHeight: '',
          maxHeight: 10,
          minWeight: '',
          maxWeight: '',
          minLifeSpan: '',
          maxLifeSpan: '',
        });
      });
    });
    describe('MinWeight input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de minWeight', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="minWeight"]').simulate('change', {
          target: { name: 'minWeight', value: 10 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          temperament: [],
          image: '',
          minHeight: '',
          maxHeight: '',
          minWeight: 10,
          maxWeight: '',
          minLifeSpan: '',
          maxLifeSpan: '',
        });
      });
    });
    describe('MaxWeight input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de maxWeight', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="maxWeight"]').simulate('change', {
          target: { name: 'maxWeight', value: 10 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          temperament: [],
          image: '',
          minHeight: '',
          maxHeight: '',
          minWeight: '',
          maxWeight: 10,
          minLifeSpan: '',
          maxLifeSpan: '',
        });
      });
    });
    describe('MinLifeSpan input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de minLifeSpan', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="minLifeSpan"]').simulate('change', {
          target: { name: 'minLifeSpan', value: 10 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          temperament: [],
          image: '',
          minHeight: '',
          maxHeight: '',
          minWeight: '',
          maxWeight: '',
          minLifeSpan: 10,
          maxLifeSpan: '',
        });
      });
    });
    describe('MaxLifeSpan input', () => {
      it('El form deberia cambiar de estado cuando escriban en el input de maxLifeSpan', () => {
        // deberías tener un único estado, no uno por cada input
        wrapper.find('input[name="maxLifeSpan"]').simulate('change', {
          target: { name: 'maxLifeSpan', value: 10 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: '',
          temperament: [],
          image: '',
          minHeight: '',
          maxHeight: '',
          minWeight: '',
          maxWeight: '',
          minLifeSpan: '',
          maxLifeSpan: 10,
        });
      });
    });
  });
});
