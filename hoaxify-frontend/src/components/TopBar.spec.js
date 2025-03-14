import React from 'react';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';
import { MemoryRouter } from 'react-router-dom';

const setup = () => {
  return render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>
  );
};

describe('TopBar', () => {
  describe('Layout', () => {
    it('has application logo', () => {
      setup();
      const img = screen.getByRole('img', { name: 'hoaxify-logo.png' });
      expect(img).toBeInTheDocument();
    });

    it('has link to homepage from logo', () => {
      setup();

      // Get the logo inside a link
      const homepageLink = screen.getByRole('link', { name: /hoaxify/i });

      // Ensure the link's href is correct
      expect(homepageLink).toHaveAttribute('href', '/');
    });

    it('has link to signup', () => {
      setup();
      const signupLink = screen.getByRole('link', { name: 'Sign Up' });
      expect(signupLink.getAttribute('href')).toBe('/signup');
    });

    it('has link to login', () => {
      setup();
      const loginLink = screen.getByRole('link', { name: 'Login' });
      expect(loginLink.getAttribute('href')).toBe('/login');
    });
  });
});
