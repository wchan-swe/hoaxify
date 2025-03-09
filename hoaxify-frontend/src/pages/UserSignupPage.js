import React, { useState, useEffect } from 'react';
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
  const [passwordRepeatConfirmed, setPasswordRepeatConfirmed] = useState(true);

  useEffect(() => {
    setPasswordRepeatConfirmed(password === passwordRepeat);
  }, [password, passwordRepeat]);

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

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
    setErrors((previousErrors) => ({
      ...previousErrors,
      displayName: undefined,
    }));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrors((previousErrors) => ({
      ...previousErrors,
      username: undefined,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((previousErrors) => ({
      ...previousErrors,
      password: undefined,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12 mb-3">
        <Input
          label="Display Name"
          placeholder="Your display name"
          value={displayName}
          onChange={handleDisplayNameChange}
          hasError={errors.displayName && true}
          error={errors.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Username"
          className="form-control"
          placeholder="Your username"
          value={username}
          onChange={handleUsernameChange}
          hasError={errors.username && true}
          error={errors.username}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password"
          className="form-control"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          hasError={(errors.password && true) || !passwordRepeatConfirmed}
          error={errors.password}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Repeat Password"
          className="form-control"
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          hasError={!passwordRepeatConfirmed}
          error={!passwordRepeatConfirmed && 'Passwords do not match'}
        />
      </div>
      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={onClickSignup}
          disabled={pendingApiCall || !passwordRepeatConfirmed}
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
