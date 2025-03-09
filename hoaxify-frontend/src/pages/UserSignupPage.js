import React, { useState } from 'react';
import Input from '../components/Input';

const UserSignupPage = ({
  actions = { postSignup: () => Promise.resolve({}) },
}) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});

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
      .catch((apiError) => {
        let newErrors = { ...errors };
        if (apiError.response.data && apiError.response.data.validationErrors) {
          newErrors = { ...apiError.response.data.validationErrors };
        }
        setErrors(newErrors);
        setPendingApiCall(false);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12-mb-3">
        <Input
          label="Display Name"
          placeholder="Your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          hasError={errors.displayName && true}
          error={errors.displayName}
        />
      </div>
      <div className="col-12-mb-3">
        <Input
          label="Username"
          className="form-control"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          hasError={errors.username && true}
          error={errors.username}
        />
      </div>
      <div className="col-12-mb-3">
        <Input
          label="Password"
          className="form-control"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={errors.password && true}
          error={errors.password}
        />
      </div>
      <div className="col-12-mb-3">
        <Input
          className="form-control"
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          hasError={errors.passwordRepeat && true}
          error={errors.passwordRepeat}
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
