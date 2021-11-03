import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createBreed, fetchTemperaments } from '../../actions';
import axios from 'axios';

const NewBreed = ({ fetchTemperaments, createBreed, temperaments = [] }) => {
  useEffect(() => {
    if (!temperaments.length) fetchTemperaments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [input, setInput] = useState({
    name: '',
    temperament: [],
    image: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minLifeSpan: '',
    maxLifeSpan: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    temperament: '',
    image: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minLifeSpan: '',
    maxLifeSpan: '',
  });

  const handleFocus = (e) => {
    console.log(e.target.type);
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateInput = () => {
    const tempErrors = { ...errors };
    for (const key in input) {
      if (input[key].length === 0) tempErrors[key] = 'This field is required';
      else if (key.includes('Height') || key.includes('Weight')) {
        if (input[key] < 1 || input[key] > 200) {
          tempErrors[key] = 'Must be between 1 and 200';
        }
      } else if (key.includes('LifeSpan')) {
        if (input[key] < 1 || input[key] > 40) {
          tempErrors[key] = 'Must be between 1 and 40';
        }
      }
    }
    if (input.minHeight > input.maxHeight) {
      tempErrors.minHeight =
        tempErrors.minHeight || 'Must be less or equal than Maximum height';
      tempErrors.maxHeight =
        tempErrors.maxheight || 'Must be greater or equal than Minimum height';
    }
    if (input.minWeight > input.maxWeight) {
      tempErrors.minWeight =
        tempErrors.minWeight || 'Must be less or equal than Maximum weight';
      tempErrors.maxWeight =
        tempErrors.maxWeight || 'Maust be greater or equal than Minimum weight';
    }
    if (input.minLifeSpan > input.maxLifeSpan) {
      tempErrors.minLifeSpan =
        tempErrors.minLifeSpan ||
        'Must be less or equal than Maximum Life Span';
      tempErrors.maxLifeSpan =
        tempErrors.maxLifeSpan ||
        'Must be greater or equal than Minimum Life Span';
    }
    setErrors({ ...tempErrors });
    return !Object.values(tempErrors).some((error) => error.length > 0);
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setInput({
        ...input,
        [e.target.name]: e.target.files,
      });
    } else if (
      e.target.name === 'temperament' &&
      !input.temperament.includes(e.target.value)
    ) {
      if (e.target.value !== 'none') {
        setInput({
          ...input,
          [e.target.name]: [...input.temperament, e.target.value],
        });
      }
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateInput();
    if (isValid) {
      const formData = new FormData();
      formData.append('file', input.image[0]);
      formData.append('upload_preset', 'marpudnc');
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dttl2byel/image/upload',
        formData
      );
      createBreed({
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        lifeSpan: `${input.minLifeSpan} - ${input.maxLifeSpan} years`,
        image: data.secure_url,
        temperament: input.temperament,
      });
    } else {
      console.log('Input is not valid');
    }
  };

  const removeTemperament = (temp) => {
    setInput({
      ...input,
      temperament: [...input.temperament.filter((t) => t !== temp)],
    });
  };

  return (
    <div>
      <h2>Add a new Dog Breed</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            onFocus={handleFocus}
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          <div>{errors.name}</div>
        </div>
        <div>
          <label>Min Height</label>
          <input
            onFocus={handleFocus}
            name="minHeight"
            type="number"
            value={input.minHeight}
            onChange={handleChange}
          />
          <div>{errors.minHeight}</div>
        </div>
        <div>
          <label>Max Height</label>
          <input
            name="maxHeight"
            type="number"
            value={input.maxHeight}
            onChange={handleChange}
          />
          <div>{errors.maxHeight}</div>
        </div>
        <div>
          <label>Min Weight</label>
          <input
            name="minWeight"
            type="number"
            value={input.minWeight}
            onChange={handleChange}
          />
          <div>{errors.minWeight}</div>
        </div>
        <div>
          <label>Max Weight</label>
          <input
            name="maxWeight"
            type="number"
            value={input.maxWeight}
            onChange={handleChange}
          />
          <div>{errors.maxWeight}</div>
        </div>
        <div>
          <label>Min Life Span</label>
          <input
            type="number"
            name="minLifeSpan"
            value={input.minLifeSpan}
            onChange={handleChange}
          />
          <div>{errors.minLifeSpan}</div>
        </div>
        <div>
          <label>Max Life Span</label>
          <input
            type="number"
            name="maxLifeSpan"
            value={input.maxLifeSpan}
            onChange={handleChange}
          />
          <div>{errors.maxLifeSpan}</div>
        </div>
        <div>
          <label>Image</label>
          <input
            files={input.image}
            type="file"
            name="image"
            onChange={handleChange}
          />
          <div>{errors.image}</div>
        </div>
        <div>
          <label>Add Temperaments</label>
          <select name="temperament" onChange={handleChange}>
            <option value="none">Choose a temperament</option>
            {temperaments.map((temp) => {
              return (
                <option key={temp} value={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          {input.temperament.map((temp) => {
            return (
              <div key={temp}>
                <span>{temp}</span>
                <button onClick={() => removeTemperament(temp)}>X</button>
              </div>
            );
          })}
          <div>{errors.temperament}</div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    temperaments: state.displayedBreeds.temperaments,
  };
};

export default connect(mapStateToProps, { createBreed, fetchTemperaments })(
  NewBreed
);
