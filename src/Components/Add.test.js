import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import {Add} from './Add';

describe('Add', () => {
  it('should render the Add component', () => {
    render(<Add />);
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
  });
  it('should enter a name', () => {
    render(<Add />);
    fireEvent.change(screen.getByPlaceholderText('name'), {
      target: { value: 'name' },
    });
    expect(screen.getByPlaceholderText('name').value).toBe('name');
  });
  it('should enter a description', () => {
    render(<Add />);
    fireEvent.change(screen.getByPlaceholderText('description'), {
      target: { value: 'description' },
    });
    expect(screen.getByPlaceholderText('description').value).toBe(
      'description'
    );
  });
  it('should click the add button', () => {
    const mockOnChange = jest.fn();
    render(<Add onChange={mockOnChange} />);
    fireEvent.change(screen.getByPlaceholderText('name'), {
        target: { value: 'name' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(mockOnChange).toHaveBeenCalled();
  });
});
