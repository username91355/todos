import {render, screen} from '@testing-library/react';
import {Button} from './Button';

describe('Button test`s', () => {

    it('should be render with title, without type', () => {
        render(<Button
            title='test'
        />);
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('test')).toHaveClass('default');
        expect(screen.getByText('test')).toHaveClass('medium');
    });

    it('should be render with type primary', () => {
        render(<Button
            title='test'
            type='primary'
        />);
        expect(screen.getByText('test')).toHaveClass('primary');
    });

    it('should be render with icon', () => {
        render(<Button
            title='test'
            icon={<div>icon</div>}
        />);
        expect(screen.getByText('test')).toHaveTextContent('icon');
    });

    it('should be render with type secondary', () => {
        render(<Button
            title='test'
            type='secondary'
        />);
        expect(screen.getByText('test')).toHaveClass('secondary');
    });

    it('should be render with sizebtn small', () => {
        render(<Button
            title='test'
            sizebtn='small'
        />);
        expect(screen.getByText('test')).toHaveClass('small');
    });

    it('should be render with sizebtn large', () => {
        render(<Button
            title='test'
            sizebtn='large'
        />);
        expect(screen.getByText('test')).toHaveClass('large');
    });

    it('button snapshot', () => {
        const view = render(<Button
            title={'title'}
        />);
        expect(view).toMatchSnapshot();
    });
});