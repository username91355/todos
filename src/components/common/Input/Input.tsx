import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Input.module.css';

interface IProps extends React.HTMLProps<HTMLInputElement> {
    value: string
    type?: string
    label?: string
    error?: string | null
    onChangeText?: (str: string) => void
    onEnter?: () => void
}

export const Input: React.FC<IProps> = props => {

    const {
        placeholder, // I extract what could not be passed to input
        type = 'text', // default type === text
        value,
        label,
        error,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        ...restProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter();
    };

    const valueStyle = `${value ? s.input__toHaveValue : ''}`;
    const errorLabelStyle = `${error ? s.input__label_error : ''}`;
    const errorAreaStyle = `${error ? s.input__area_error : ''}`;

    if(type === 'submit') return <input type='submit' value={value} {...restProps}/>;

    return (
        <div className={s.input}>
            <input
                name='input'
                type={type}
                placeholder={label}
                value={value}
                className={`${s.input__area} ${errorAreaStyle}`}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                {...restProps}
            />
            <label
                htmlFor='input'
                data-testid='label'
                className={`${s.input__label} ${valueStyle} ${errorLabelStyle}`}
            >
                {error || label}
            </label>
        </div>
    );
};