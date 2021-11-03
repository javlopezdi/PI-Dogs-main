import { render, screen } from '@testing-library/react';
import { Main } from './Main';

test('renders learn react link', () => {
  render(<Main />);
  const buttonElement = screen.getByText(/Search/i);
  expect(buttonElement).toBeInTheDocument();
});
