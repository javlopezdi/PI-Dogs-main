import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../svgs/Logo';
import SearchName from '../main/SearchName';

const Navbar = () => {
  let pathname = useLocation().pathname;
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link className="navLogo" to="/">
        <Logo />
      </Link>
      {/* Search Name Bar */}
      {pathname === '/dogs' && <SearchName />}
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
