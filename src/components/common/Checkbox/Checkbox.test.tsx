import {render, screen} from '@testing-library/react';
import {Checkbox} from './Checkbox';
import userEvent from '@testing-library/user-event';
import {ChangeEvent} from 'react';

let onChange: (e: ChangeEvent<HTMLInputElement>) => void;
let onChangeChecked: (checked: boolean) => void;

beforeEach(()=> {
    onChange = jest.fn();
    onChangeChecked = jest.fn();
});

describe('Button test`s', () => {

    it('should be render checked true', () => {
        render(<Checkbox
            checked={true}
            onChange={onChange}
        />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('should be render checked false', () => {
        render(<Checkbox
            checked={false}
            onChange={onChange}
        />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('should be call onChange and onChangeChecked', () => {
        render(<Checkbox
            checked={false}
            onChange={onChange}
            onChangeChecked={onChangeChecked}
        />);
        userEvent.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(onChange).toBeCalledTimes(1);
        expect(onChangeChecked).toBeCalledTimes(1);
    });

    it('checkbox snapshot', () => {
        const view = render(<Checkbox
            checked={true}
        />);
        expect(view).toMatchSnapshot();
    });
});