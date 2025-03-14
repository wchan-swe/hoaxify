import React from 'react';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authReducer';

// Default state (user not logged in)
const defaultState = {
  isLoggedIn: false,
  id: 0,
  username: '',
  displayName: '',
  image: '',
  password: '',
};

// Logged-in state (user logged in)
const loggedInState = {
  isLoggedIn: true,
  id: 1,
  username: 'user1',
  displayName: 'display1',
  image: 'profile1.png',
  password: 'P4ssword',
};

const renderWithRedux = (preloadedState = defaultState) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: preloadedState },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    </Provider>
  );
};

describe('TopBar', () => {
  describe('Layout', () => {
    it('has application logo', () => {
      renderWithRedux();
      const img = screen.getByRole('img', { name: 'hoaxify-logo.png' });
      expect(img).toBeInTheDocument();
    });

    it('has link to homepage from logo', () => {
      renderWithRedux();
      const homepageLink = screen.getByRole('link', { name: /hoaxify/i });
      expect(homepageLink).toHaveAttribute('href', '/');
    });

    it('has link to signup', () => {
      renderWithRedux();
      const signupLink = screen.getByRole('link', { name: 'Sign Up' });
      expect(signupLink.getAttribute('href')).toBe('/signup');
    });

    it('has link to login', () => {
      renderWithRedux();
      const loginLink = screen.getByRole('link', { name: 'Login' });
      expect(loginLink.getAttribute('href')).toBe('/login');
    });

    it('has link to logout when user logged in', () => {
      renderWithRedux(loggedInState);
      const logoutLink = screen.getByRole('link', { name: 'Logout' });
      expect(logoutLink.getAttribute('href')).toBe('/logout');
    });

    it('has link to user profile when user logged in', () => {
      renderWithRedux(loggedInState);
      const profileLink = screen.getByRole('link', { name: 'My Profile' });
      expect(profileLink.getAttribute('href')).toBe('/user1');
    });
  });
});
