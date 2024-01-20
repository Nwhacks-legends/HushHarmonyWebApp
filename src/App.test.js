import { render, screen } from '@testing-library/react';
import App from './App';

test('😍', () => {
  render(<App />);
  expect(true).toBeTruthy();
});