import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';
import * as apiCalls from '../api/apiCalls';

const actions = {
  postLogin: apiCalls.login,
  postSignup: apiCalls.signup,
};

const App = () => {
  return (
    <div>
      <TopBar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<HomePage actions={actions} />} />
          <Route path="/login" element={<LoginPage actions={actions} />} />
          <Route
            path="/signup"
            element={<UserSignupPage actions={actions} />}
          />
          <Route path="/:username" element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
