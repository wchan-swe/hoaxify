import React from 'react';
import { render, screen } from '@testing-library/react';
import UserPage from './UserPage';

describe('UserPage', () => {
  describe('Layout', () => {
    it('has header of UserPage', () => {
      render(<UserPage />);
      const header = screen.getByRole('heading', { name: 'UserPage' });
      expect(header).toBeInTheDocument();
    });
  });
});
