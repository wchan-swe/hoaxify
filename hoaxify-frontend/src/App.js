import React from 'react';
import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';
import * as apiCalls from './api/apiCalls';

const actions = {
  postSignup: apiCalls.signup,
};

const App = () => {
  return (
    <div>
      <UserSignupPage actions={actions} />
      <LoginPage />
    </div>
  );
};

export default App;
