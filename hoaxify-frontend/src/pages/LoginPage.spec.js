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

    it('calls postLogin when the actions are provided in props and input fields have value', async () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };
      render(<LoginPage actions={actions} />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      userEvent.click(button);
      await waitFor(() => {
        expect(actions.postLogin).toHaveBeenCalledTimes(1);
      });
    });

    it('does not throw exception when clicking the button when actions not provided in props', async () => {
      render(<LoginPage />);
      const button = screen.getByRole('button', { name: 'Login' });
      await waitFor(() => expect(() => userEvent.click(button)).not.toThrow());
    });

    it('calls postLogin with credentials in body', async () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };
      render(<LoginPage actions={actions} />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      userEvent.click(button);
      await waitFor(() => {
        expect(actions.postLogin).toHaveBeenCalledWith({
          username: 'my-user-name',
          password: 'P4ssword',
        });
      });
    });

    it('enables the button when username and password is not empty', () => {
      render(<LoginPage />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeEnabled();
    });

    it('disables the button when username is empty', () => {
      render(<LoginPage />);
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeDisabled();
    });

    it('disables the button when password is empty', () => {
      render(<LoginPage />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeDisabled();
    });

    it('displays alert when login fails', async () => {
      const actions = {
        postLogin: jest
          .fn()
          .mockRejectedValue({ response: { data: 'Login failed' } }),
      };
      render(<LoginPage actions={actions} />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      userEvent.click(button);
      await waitFor(() => {
        const alert = screen.getByText('Login failed');
        expect(alert).toBeInTheDocument();
      });
    });

    it('clears alert when user changes username', async () => {
      const actions = {
        postLogin: jest
          .fn()
          .mockRejectedValue({ response: { data: 'Login failed' } }),
      };
      render(<LoginPage actions={actions} />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      userEvent.click(button);
      await waitFor(() => {
        const alert = screen.getByText('Login failed');
        expect(alert).toBeInTheDocument();
      });

      userEvent.clear(usernameInput);
      const alert = screen.queryByText('Login failed');
      expect(alert).not.toBeInTheDocument();
    });

    it('clears alert when user changes password', async () => {
      const actions = {
        postLogin: jest
          .fn()
          .mockRejectedValue({ response: { data: 'Login failed' } }),
      };
      render(<LoginPage actions={actions} />);
      const usernameInput = screen.getByPlaceholderText('Your username');
      userEvent.type(usernameInput, 'my-user-name');
      const passwordInput = screen.getByPlaceholderText('Your password');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.getByRole('button', { name: 'Login' });
      userEvent.click(button);
      await waitFor(() => {
        const alert = screen.getByText('Login failed');
        expect(alert).toBeInTheDocument();
      });

      userEvent.clear(passwordInput);
      const alert = screen.queryByText('Login failed');
      expect(alert).not.toBeInTheDocument();
    });
  });
});
