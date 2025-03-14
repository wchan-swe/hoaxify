import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify-logo.png';
import { connect } from 'react-redux';

const TopBar = ({ isLoggedIn, username, displayName, image }) => {
  let links = (
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    links = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={`/${username}`} className="nav-link">
            {displayName}
          </Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
          <Link to={`/${username}`} className="nav-link">
            My Profile
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width={60} alt="hoaxify-logo.png" />
            Hoaxify
          </Link>
          {links}
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    username: state.auth.username,
    displayName: state.auth.displayName,
    image: state.auth.image,
  };
};

export default connect(mapStateToProps)(TopBar);
