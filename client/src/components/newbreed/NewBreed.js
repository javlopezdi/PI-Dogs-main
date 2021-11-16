import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createBreed,
  fetchTemperaments,
  setIsSuccessModalOpen,
} from '../../actions';
import axios from 'axios';
import './NewBreed.css';
import SuccessModal from './SuccessModal';

export const NewBreed = ({
  fetchTemperaments,
  createBreed,
  temperaments = [],
  isSuccessModalOpen,
  setIsSuccessModalOpen,
}) => {
  useEffect(() => {
    if (!temperaments.length) fetchTemperaments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [input, setInput] = React.useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFocus = (e) => {
    console.log(e.target.type);
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateInput = () => {
    const tempErrors = { ...errors };
    for (const key in input) {
      if (input[key].length === 0) tempErrors[key] = 'This field is required';
      else if (key.includes('Height') || key.includes('Weight')) {
        if (Number(input[key]) < 1 || Number(input[key]) > 200) {
          tempErrors[key] = 'Must be between 1 and 200';
        }
      } else if (key.includes('LifeSpan')) {
        if (Number(input[key]) < 1 || Number(input[key]) > 40) {
          tempErrors[key] = 'Must be between 1 and 40';
        }
      }
    }
    if (Number(input.minHeight) > Number(input.maxHeight)) {
      tempErrors.minHeight =
        tempErrors.minHeight || 'Must be less or equal than Maximum height';
      tempErrors.maxHeight =
        tempErrors.maxheight || 'Must be greater or equal than Minimum height';
    }
    if (Number(input.minWeight) > Number(input.maxWeight)) {
      tempErrors.minWeight =
        tempErrors.minWeight || 'Must be less or equal than Maximum weight';
      tempErrors.maxWeight =
        tempErrors.maxWeight || 'Must be greater or equal than Minimum weight';
    }
    if (Number(input.minLifeSpan) > Number(input.maxLifeSpan)) {
      tempErrors.minLifeSpan =
        tempErrors.minLifeSpan ||
        'Must be less or equal than Maximum Life Span';
      tempErrors.maxLifeSpan =
        tempErrors.maxLifeSpan ||
        'Must be greater or equal than Minimum Life Span';
    }
    if (input.temperament.length > 3) {
      tempErrors.temperament =
        tempErrors.temperament || 'Must have less than 4 temperaments';
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
    setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  const removeTemperament = (temp) => {
    setInput({
      ...input,
      temperament: [...input.temperament.filter((t) => t !== temp)],
    });
  };

  return (
    <React.Fragment>
      <div className="newBreed">
        <h2 className="newBreedTitle">Add a new Dog Breed</h2>
        <form className="newBreedForm" onSubmit={handleSubmit}>
          <div className="wholeInputContainer">
            <label>Name</label>
            <input
              placeholder="Breed Name"
              onFocus={handleFocus}
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <div className="newBreedError">{errors.name}</div>
          </div>
          <div className="wholeInputContainer">
            <label>Height (cm)</label>
            <div>
              <div className="minInputContainer">
                <input
                  placeholder="Min"
                  onFocus={handleFocus}
                  name="minHeight"
                  type="number"
                  value={input.minHeight}
                  onChange={handleChange}
                />
                <div className="newBreedError">{errors.minHeight}</div>
              </div>
              <div className="maxInputContainer">
                <input
                  placeholder="Max"
                  onFocus={handleFocus}
                  name="maxHeight"
                  type="number"
                  value={input.maxHeight}
                  onChange={handleChange}
                />
                <div className="newBreedError">{errors.maxHeight}</div>
              </div>
            </div>
          </div>
          <div className="wholeInputContainer">
            <label>Weight (kg)</label>
            <div>
              <div className="minInputContainer">
                <input
                  placeholder="Min"
                  onFocus={handleFocus}
                  name="minWeight"
                  type="number"
                  value={input.minWeight}
                  onChange={handleChange}
                />
                <div className="newBreedError">{errors.minWeight}</div>
              </div>
              <div className="maxInputContainer">
                <input
                  placeholder="Max"
                  onFocus={handleFocus}
                  name="maxWeight"
                  type="number"
                  value={input.maxWeight}
                  onChange={handleChange}
                />
                <div className="newBreedError">{errors.maxWeight}</div>
              </div>
            </div>
          </div>
          <div className="wholeInputContainer">
            <label>Life Span (years)</label>
            <div>
              <div className="minInputContainer">
                <input
                  placeholder="Min"
                  onFocus={handleFocus}
                  type="number"
                  name="minLifeSpan"
                  value={input.minLifeSpan}
                  onChange={handleChange}
                />
                <div className="newBreedError">{errors.minLifeSpan}</div>
              </div>
              <div className="maxInputContainer">
                <input
                  placeholder="Max"
                  onFocus={handleFocus}
                  type="number"
                  name="maxLifeSpan"
                  value={input.maxLifeSpan}
                  onChange={handleChange}
                />
                <div className="newBreedError">{errors.maxLifeSpan}</div>
              </div>
            </div>
          </div>
          <div className="wholeInputContainer">
            <label>Image</label>
            <input
              id="newBreedImageInput"
              onFocus={handleFocus}
              files={input.image}
              type="file"
              name="image"
              onChange={handleChange}
            />
            <div className="newBreedError">{errors.image}</div>
          </div>
          <div className="wholeInputContainer">
            <label>Add Temperaments</label>
            <select
              disabled={input.temperament.length >= 3}
              onFocus={handleFocus}
              name="temperament"
              onChange={handleChange}
            >
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
          <div className="newBreedTemperamentsChosen">
            {input.temperament.map((temp) => {
              return (
                <div className="newBreedTemperamentChosen" key={temp}>
                  <span>{temp}</span>
                  <button onClick={() => removeTemperament(temp)}>X</button>
                </div>
              );
            })}
            <div className="newBreedError">{errors.temperament}</div>
          </div>
          <button
            disabled={isSubmitting}
            className={`newBreedButton ${isSubmitting ? 'isSubmitting' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        closeModal={() => setIsSuccessModalOpen(false)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    temperaments: state.displayedBreeds.temperaments,
    isSuccessModalOpen: state.displayedBreeds.isSuccessModalOpen,
  };
};

export default connect(mapStateToProps, {
  setIsSuccessModalOpen,
  createBreed,
  fetchTemperaments,
})(NewBreed);
