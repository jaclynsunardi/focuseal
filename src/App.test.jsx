import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders main heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Hello world!/i })
    ).toBeInTheDocument();
  });

  // Add more tests here if needed
});