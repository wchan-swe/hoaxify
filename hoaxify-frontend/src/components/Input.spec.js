import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Layout', () => {
  it('has input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('displays the label provided as props', () => {
    render(<Input label="Test label" />);
    const label = screen.getByText('Test label');
    expect(label).toBeInTheDocument();
  });

  it('does not display label when not provided as props', () => {
    render(<Input />);
    const label = screen.queryByRole('label');
    expect(label).not.toBeInTheDocument();
  });

  it('has type text when type is not provided as props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.type).toBe('text');
  });

  it('has type password when type is provided as password', () => {
    render(<Input type="password" label="Password" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays placeholder when provided as props', () => {
    render(<Input placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
  });

  it('has value for input when provided as props', () => {
    render(<Input value="Test value" />);
    const input = screen.getByDisplayValue('Test value');
    expect(input).toBeInTheDocument();
  });

  it('has onChange callback when provided as props', async () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'test');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(4);
    });
  });

  it('has default style when there is no validation error or success', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('form-control');
  });

  it('has success style when hasError is false', () => {
    render(<Input hasError={false} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('form-control is-valid');
  });

  it('has error style when hasError is true', () => {
    render(<Input hasError />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('form-control is-invalid');
  });

  it('displays the error text when it is provided', () => {
    render(<Input hasError error="Cannot be null" />);
    const error = screen.getByText('Cannot be null');
    expect(error).toBeInTheDocument();
  });

  it('does not display the error text when hasError not provided', () => {
    render(<Input error="Cannot be null" />);
    const error = screen.queryByText('Cannot be null');
    expect(error).not.toBeInTheDocument();
  });
});
