import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../svgs/Logo';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link className="navLogo" to="/">
        <Logo />
      </Link>
      {/* Nav Options */}
      <div className="navOptions">
        <Link className="navOption" to="/dogs">
          Dogs
        </Link>
        <Link className="navOption" to="/dogs/new">
          Add Dog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
