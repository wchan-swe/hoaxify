import React from 'react';
import UserSignupPage from './pages/UserSignupPage';
import * as apiCalls from './api/apiCalls';

const actions = {
  postSignup: apiCalls.signup,
};

const App = () => {
  return (
    <div>
      <UserSignupPage actions={actions} />
    </div>
  );
};

export default App;
