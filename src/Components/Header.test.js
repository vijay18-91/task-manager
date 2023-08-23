import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import {Header} from './Header';

describe('Header', () => {
    it('should render the Header component', () => {
        render(<Header />);
        expect(screen.getByText('Task Manger')).toBeInTheDocument();
    });
});