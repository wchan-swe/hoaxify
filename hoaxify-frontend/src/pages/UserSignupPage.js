import React, { useState } from 'react';

const UserSignupPage = ({
  actions = { postSignup: () => Promise.resolve({}) },
}) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onClickSignup = () => {
    const user = {
      displayName,
      username,
      password,
    };
    setPendingApiCall(true);
    actions
      .postSignup(user)
      .then((response) => {
        setPendingApiCall(false);
      })
      .catch((error) => {
        setPendingApiCall(false);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12-mb-3">
        <label>Display Name</label>
        <input
          className="form-control"
          placeholder="Your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className="col-12-mb-3">
        <label>Username</label>
        <input
          className="form-control"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="col-12-mb-3">
        <label>Password</label>
        <input
          className="form-control"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="col-12-mb-3">
        <label>Password Repeat</label>
        <input
          className="form-control"
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
      </div>
      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={onClickSignup}
          disabled={pendingApiCall}
        >
          {pendingApiCall && (
            <>
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Loading...</span>
            </>
          )}
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default UserSignupPage;
