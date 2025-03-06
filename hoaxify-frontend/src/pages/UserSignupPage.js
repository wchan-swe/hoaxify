import React from 'react';

const UserSignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input placeholder="Your display name" />
      </div>
      <div>
        <input placeholder="Your username" />
      </div>
      <div>
        <input placeholder="Your password" type="password" />
      </div>
      <div>
        <input placeholder="Repeat your password" type="password" />
      </div>
    </div>
  );
};

export default UserSignupPage;
