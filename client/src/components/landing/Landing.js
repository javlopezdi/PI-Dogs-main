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
        <div>
          <Link to="/dogs" className="startButton">
            Start discovering
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
