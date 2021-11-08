import React from 'react';
import ReactDOM from 'react-dom';
import './SuccessModal.css';
import SuccessModalDog from './SuccessModalDog.jpg';

export default function SuccessModal({ isOpen, closeModal }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="successModalOverlay"></div>
      <div className="successModal">
        <img
          className="successModalImage"
          alt="Smiling dog"
          src={SuccessModalDog}
        />
        <div className="successModalTitleContainer">
          <h4 className="successModalTitle">Success!</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="successModalDescription">
          A new breed was created successfully
        </p>
        <button className="successModalButton" onClick={closeModal}>
          Continue
        </button>
      </div>
    </React.Fragment>,
    document.querySelector('#portal')
  );
}
