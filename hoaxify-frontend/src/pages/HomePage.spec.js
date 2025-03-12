import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  describe('Layout', () => {
    it('has header of Homepage', () => {
      render(<HomePage />);
      const header = screen.getByRole('heading', { name: 'Homepage' });
      expect(header).toBeInTheDocument();
    });
  });
});
