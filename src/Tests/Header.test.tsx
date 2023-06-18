import { render, screen } from '@testing-library/react';
import Header from '../Components/Header'; // adjust the path to match your file structure

describe('Header', () => {
    test('renders Header component', () => {
        render(<Header />);
        expect(screen.getByTestId('heading')).toHaveTextContent('MyReads');
    });
});
