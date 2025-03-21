import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserSignupPage from './UserSignupPage';

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      render(<UserSignupPage />);
      const header = screen.getByRole('heading', { name: 'Sign Up' });
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

    it('has password type for password repeat input', () => {
      render(<UserSignupPage />);
      const input = screen.getByPlaceholderText('Repeat your password');
      expect(input.type).toBe('password');
    });

    it('has submit button', () => {
      render(<UserSignupPage />);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });
  });
});

describe('Interactions', () => {
  let button,
    displayNameInput,
    usernameInput,
    passwordInput,
    passwordRepeatInput;

  const setupForSubmit = (props) => {
    render(<UserSignupPage {...props} />);
    displayNameInput = screen.getByPlaceholderText('Your display name');
    usernameInput = screen.getByPlaceholderText('Your username');
    passwordInput = screen.getByPlaceholderText('Your password');
    passwordRepeatInput = screen.getByPlaceholderText('Repeat your password');
    userEvent.type(displayNameInput, 'my-display-name');
    userEvent.type(usernameInput, 'my-username');
    userEvent.type(passwordInput, 'P4ssword');
    userEvent.type(passwordRepeatInput, 'P4ssword');
    button = screen.getByRole('button', { name: 'Sign Up' });
    return button;
  };

  const mockAsyncDelayed = () => {
    return jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({});
        }, 300);
      });
    });
  };

  it('sets the display name value into state', () => {
    render(<UserSignupPage />);
    const displayNameInput = screen.getByPlaceholderText('Your display name');
    userEvent.type(displayNameInput, 'my-display-name');
    expect(displayNameInput).toHaveValue('my-display-name');
  });

  it('sets the username value into state', () => {
    render(<UserSignupPage />);
    const usernameInput = screen.getByPlaceholderText('Your username');
    userEvent.type(usernameInput, 'my-username');
    expect(usernameInput).toHaveValue('my-username');
  });

  it('sets the password value into state', () => {
    render(<UserSignupPage />);
    const passwordInput = screen.getByPlaceholderText('Your password');
    userEvent.type(passwordInput, 'P4ssword');
    expect(passwordInput).toHaveValue('P4ssword');
  });

  it('sets the password repeat value into state', () => {
    render(<UserSignupPage />);
    const passwordRepeatInput = screen.getByPlaceholderText(
      'Repeat your password'
    );
    userEvent.type(passwordRepeatInput, 'P4ssword');
    expect(passwordRepeatInput).toHaveValue('P4ssword');
  });

  it('calls postSignup when the fields are valid and the actions are provided in props', async () => {
    const actions = {
      postSignup: jest.fn().mockResolvedValue({}),
    };
    setupForSubmit({ actions });
    const button = screen.getByRole('button', { name: 'Sign Up' });
    userEvent.click(button);
    await waitFor(() => expect(actions.postSignup).toHaveBeenCalledTimes(1));
  });

  it('does not throw exception when clicking the button when actions not provided in props', async () => {
    setupForSubmit();
    const button = screen.getByRole('button', { name: 'Sign Up' });
    await waitFor(() => expect(() => userEvent.click(button)).not.toThrow());
  });

  it('calls postSignup with user body when the fields are valid', async () => {
    const actions = {
      postSignup: jest.fn().mockResolvedValue({}),
    };
    setupForSubmit({ actions });
    const button = screen.getByRole('button', { name: 'Sign Up' });
    userEvent.click(button);
    const expectedUserObject = {
      displayName: 'my-display-name',
      username: 'my-username',
      password: 'P4ssword',
    };
    await waitFor(() =>
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject)
    );
  });

  it('does not allow user to click the Sign Up button when there is an ongoing api call', () => {
    const actions = {
      postSignup: mockAsyncDelayed(),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    userEvent.click(button);
    expect(actions.postSignup).toHaveBeenCalledTimes(1);
  });

  it('displays spinner when there is an ongoing api call', () => {
    const actions = {
      postSignup: mockAsyncDelayed(),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    const spinner = screen.queryByText('Loading...');
    expect(spinner).toBeInTheDocument();
  });

  it('hides spinner after api call finishes successfully', async () => {
    const actions = {
      postSignup: mockAsyncDelayed(),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    await screen.findByRole('button', { name: 'Sign Up' });
    const spinner = screen.queryByText('Loading...');
    expect(spinner).not.toBeInTheDocument();
  });

  it('displays validation error for display name when error is received for the field', async () => {
    const actions = {
      postSignup: jest.fn().mockRejectedValue({
        response: {
          data: {
            validationErrors: {
              displayName: 'Cannot be null',
            },
          },
        },
      }),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    const errorMessage = await screen.findByText('Cannot be null');
    expect(errorMessage).toBeInTheDocument();
  });

  it('enables the Sign Up button when password and repeat password have same value', () => {
    setupForSubmit();
    expect(button).toBeEnabled();
  });

  it('disables the Sign Up button when password does not match to repeat password', () => {
    setupForSubmit();
    userEvent.type(passwordInput, 'new-password');
    expect(button).toBeDisabled();
  });

  it('disables the Sign Up button when repeat password does not match to password', () => {
    setupForSubmit();
    userEvent.type(passwordRepeatInput, 'wrong-password');
    expect(button).toBeDisabled();
  });

  it('displays error style for repeat password input when password repeat mismatch', () => {
    setupForSubmit();
    userEvent.type(passwordRepeatInput, 'wrong-password');
    const repeatPasswordInput = screen.getByPlaceholderText(
      'Repeat your password'
    );
    expect(repeatPasswordInput).toHaveClass('is-invalid');
  });

  it('displays error style for password input when password repeat mismatch', () => {
    setupForSubmit();
    userEvent.type(passwordRepeatInput, 'wrong-password');
    const passwordInput = screen.getByPlaceholderText('Your password');
    expect(passwordInput).toHaveClass('is-invalid');
  });

  it('hides the validation error when user changes the content of display name', async () => {
    const actions = {
      postSignup: jest.fn().mockRejectedValue({
        response: {
          data: {
            validationErrors: {
              displayName: 'Cannot be null',
            },
          },
        },
      }),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    await screen.findByText('Cannot be null');
    userEvent.type(displayNameInput, 'new-display-name');
    const errorMessage = screen.queryByText('Cannot be null');
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('hides the validation error when user changes the content of username', async () => {
    const actions = {
      postSignup: jest.fn().mockRejectedValue({
        response: {
          data: {
            validationErrors: {
              username: 'Cannot be null',
            },
          },
        },
      }),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    await screen.findByText('Cannot be null');
    userEvent.type(usernameInput, 'new-username');
    const errorMessage = screen.queryByText('Cannot be null');
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('hides the validation error when user changes the content of password', async () => {
    const actions = {
      postSignup: jest.fn().mockRejectedValue({
        response: {
          data: {
            validationErrors: {
              password: 'Cannot be null',
            },
          },
        },
      }),
    };
    setupForSubmit({ actions });
    userEvent.click(button);
    await screen.findByText('Cannot be null');
    userEvent.type(passwordInput, 'new-password');
    const errorMessage = screen.queryByText('Cannot be null');
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('redirects to home page after successful sign up', async () => {
    setupForSubmit();
    userEvent.click(button);
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });
});
