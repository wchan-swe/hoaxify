import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserSignupPage from './UserSignupPage';

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      render(<UserSignupPage />);
      const header = screen.getByText('Sign Up');
      expect(header).toBeInTheDocument();
    });
    it('has input for display name', () => {
      render(<UserSignupPage />);
      const input = screen.getByPlaceholderText('Your display name');
      expect(input).toBeInTheDocument();
    });
    it('has input for username', () => {
      render(<UserSignupPage />);
      const input = screen.getByPlaceholderText('Your username');
      expect(input).toBeInTheDocument();
    });
    it('has input for password', () => {
      render(<UserSignupPage />);
      const input = screen.getByPlaceholderText('Your password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(<UserSignupPage />);
      const input = screen.getByPlaceholderText('Your password');
      expect(input.type).toBe('password');
    });
    it('has input for password repeat', () => {
      render(<UserSignupPage />);
      const input = screen.getByPlaceholderText('Repeat your password');
      expect(input).toBeInTheDocument();
    });
  });
});
