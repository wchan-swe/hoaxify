import React, { useState } from 'react';

const UserSignupPage = ({
  actions = { postSignup: () => Promise.resolve({}) },
}) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onClickSignup = () => {
    const user = {
      displayName,
      username,
      password,
    };
    actions.postSignup(user);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          placeholder="Your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onClickSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default UserSignupPage;
