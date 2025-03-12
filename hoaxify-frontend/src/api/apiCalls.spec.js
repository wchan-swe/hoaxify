import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
  describe('signup', () => {
    it('calls /api/1.0/users', async () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;
      apiCalls.signup();
      // get the first argument of the first call
      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe('/api/1.0/users');
    });
  });

  describe('login', () => {
    it('calls /api/1.0/login', async () => {
      const mockLogin = jest.fn();
      axios.post = mockLogin;
      apiCalls.login({ username: 'test-user', password: 'P4ssword' });
      const path = mockLogin.mock.calls[0][0];
      expect(path).toBe('/api/1.0/login');
    });
  });
});
