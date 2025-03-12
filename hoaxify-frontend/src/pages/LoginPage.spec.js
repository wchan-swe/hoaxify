import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  describe('Layout', () => {
    it('has header of Login', () => {
      render(<LoginPage />);
      const header = screen.getByRole('heading', { name: 'Login' });
      expect(header).toBeInTheDocument();
    });

    it('has input for username', () => {
      render(<LoginPage />);
      const input = screen.getByPlaceholderText('Your username');
      expect(input).toBeInTheDocument();
    });

    it('has input for password', () => {
      render(<LoginPage />);
      const input = screen.getByPlaceholderText('Your password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      render(<LoginPage />);
      const input = screen.getByPlaceholderText('Your password');
      expect(input.type).toBe('password');
    });

    it('has login button', () => {
      render(<LoginPage />);
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('sets the username value into state', () => {
      render(<LoginPage />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      expect(usernameInput).toHaveValue('my-user-name');
    });

    it('sets the password value into state', () => {
      render(<LoginPage />);
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      expect(passwordInput).toHaveValue('P4ssword');
    });
  });
});
