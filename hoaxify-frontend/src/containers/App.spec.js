import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authReducer';
import App from './App';

const defaultState = {
  auth: {
    isLoggedIn: false,
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
  },
};

const loggedInState = {
  auth: {
    isLoggedIn: true,
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png',
    password: 'P4ssword',
  },
};

const setup = (path, initialState = defaultState) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('App', () => {
  it('displays homepage when url is "/"', () => {
    setup('/');
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  it('displays LoginPage when url is "/login"', () => {
    setup('/login');
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('displays only LoginPage when url is /login', () => {
    setup('/login');
    expect(screen.queryByTestId('homepage')).not.toBeInTheDocument();
  });

  it('displays UserSignupPage when url is /signup', () => {
    setup('/signup');
    expect(
      screen.getByRole('heading', { name: 'Sign Up' })
    ).toBeInTheDocument();
  });

  it('displays userpage when url is other than /, /login or /signup', () => {
    setup('/userpage');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays TopBar when url is /', () => {
    setup('/');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays TopBar when url is /login', () => {
    setup('/login');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays TopBar when url is /signup', () => {
    setup('/signup');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays TopBar when url is /userpage', () => {
    setup('/userpage');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows the UserSignUp page when clicking the signup link', () => {
    setup('/');
    const signupLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink.getAttribute('href')).toBe('/signup');
  });

  it('shows the LoginPage when clicking the login link', () => {
    setup('/');
    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');
  });

  it('shows the HomePage when clicking the logo link', () => {
    setup('/login');
    const logoLink = screen.getByRole('link', { name: /hoaxify/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink.getAttribute('href')).toBe('/');
  });
});
