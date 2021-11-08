import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import LandingDog from './LandingDog.png';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landingFirstColumn">
        <div>
          <h1 className="landingTitle">All about dogs</h1>
        </div>
        <div>
          <h4 className="landingSubtitle">
            The best web application to learn everything about your best friend
          </h4>
        </div>
        <div className="landingButtonContainer">
          <Link to="/dogs" className="startButton">
            <span>Start discovering</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="#FF792C"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="landingSecondColumn">
        <img
          alt="A cool dog with sunglasses"
          className="landingImage"
          src={LandingDog}
        />
      </div>
    </div>
  );
};

export default Landing;
