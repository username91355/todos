import s from './Input.module.css';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Input} from './Input';

const onChange = jest.fn();
const onKeyPress = jest.fn();
const onChangeText = jest.fn();
const onEnter = jest.fn();

describe('Input test`s', () => {

    it('should be render only with value === ""', () => {
        render(<Input
            value={''}
        />);
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '');
        expect(screen.getByTestId('label')).not.toHaveClass(s.input__toHaveValue);
    });

    it('should be render only with value (should have type text)', () => {
        render(<Input
            value={'test'}
        />);
        expect(screen.getByRole('textbox')).toHaveAttribute('value', 'test');
    });

    it('should be render with type "submit" and className', () => {
        render(<Input
            value={'test'}
            type={'submit'}
            className={'test-class-name'}
        />);
        expect(screen.getByDisplayValue('test')).toHaveAttribute('type', 'submit');
        expect(screen.getByDisplayValue('test')).toHaveClass('test-class-name');
    });

    it('should be render with error', () => {
        render(<Input
            value={'test'}
            error={'test error'}
            label={'test label'}
        />);
        expect(screen.getByTestId('label')).toHaveTextContent('test error');
        expect(screen.getByTestId('label')).toHaveClass(s.input__label_error);
        expect(screen.getByRole('textbox')).toHaveClass(s.input__area_error);
    });

    it('should be with label', () => {
        render(<Input
            value={'test'}
            label={'label'}
        />);
        expect(screen.getByText('label')).toBeInTheDocument();
    });

    it('not should be placeholder in input', () => {
        render(<Input
            value={'test'}
            label={'label'}
            placeholder={'placeholder'}
        />);
        expect(screen.getByText('label')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).not.toHaveAttribute('placeholder', 'placeholder');
    });

    it('should be called onChangeText', () => {
        render(<Input
            value={'test'}
            onChange={onChange}
            onChangeText={onChangeText}
        />);
        userEvent.type(screen.getByRole('textbox'), 'test')
        expect(onChange).toBeCalledTimes(4);
        expect(onChangeText).toBeCalledTimes(4);
    });

    it('should be called onEnter', () => {
        render(<Input
            value={'test'}
            onKeyPress={onKeyPress}
            onEnter={onEnter}
        />);
        userEvent.type(screen.getByRole('textbox'), `{enter}`)
        expect(onKeyPress).toBeCalledTimes(1);
        expect(onEnter).toBeCalledTimes(1);
    });

    it('Input snapshot', () => {
        const view = render(<Input value={'test'}/>);
        expect(view).toMatchSnapshot();
    });
});