import React, { useState } from 'react';
import Input from '../components/Input';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="col-12 mb-3">
        <Input
          label="Username"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
