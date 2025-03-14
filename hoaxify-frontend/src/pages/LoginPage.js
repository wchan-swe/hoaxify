import React, { useState } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';

const LoginPage = ({ actions = { postLogin: () => Promise.resolve({}) } }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onClickLogin = async () => {
    const user = { username, password };
    setPendingApiCall(true);
    try {
      await actions.postLogin(user);
    } catch (apiError) {
      setError(apiError.response.data);
    }
    setPendingApiCall(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const isButtonDisabled = !username || !password;

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="col-12 mb-3">
        <Input
          label="Username"
          placeholder="Your username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="text-center">
        <ButtonWithProgress
          onClickSignup={onClickLogin}
          pendingApiCall={pendingApiCall}
          passwordRepeatConfirmed={!isButtonDisabled}
          text="Login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
