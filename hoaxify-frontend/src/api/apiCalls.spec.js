import axios from 'axios';
import * as apicalls from './apiCalls';

describe('apiCalls', () => {
  describe('signup', () => {
    it('calls /api/1.0/users', async () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;
      apicalls.signup();

      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe('/api/1.0/users');
    });
  });
});
