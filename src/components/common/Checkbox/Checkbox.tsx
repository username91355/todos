import React, {ChangeEvent} from 'react';
import s from './Checkbox.module.css';

interface IProps extends React.HTMLProps<HTMLInputElement> {
    checked: boolean
    onChangeChecked?: (value: boolean) => void
    spanClassName?: string
}

export const Checkbox: React.FC<IProps> = props => {

    const {
        checked,
        onChange,
        onChangeChecked,
        spanClassName,
        label,
        ...restProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    };

    const isSelectClass = checked ? s.checkbox__input_select : s.checkbox__input_not_select;

    return (
        <div className={s.checkbox}>
            <label className={s.checkbox__wrapper}>
                <input
                    type={'checkbox'}
                    checked={checked}
                    onChange={onChangeHandler}
                    className={`${s.checkbox__input} ${isSelectClass}`}
                    {...restProps}
                />
                <span
                    className={`${s.checkbox__span} ${spanClassName}`}
                >
                    {label}
                </span>
            </label>
        </div>
    );
};