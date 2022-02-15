import React, {useState} from 'react';
import s from './EditTodoModal.module.css';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {useDispatch} from 'react-redux';
import {editTodo} from '../../../store/reducers/todos-reducer/todos-reducer';

interface IProps {
    id: number
    title: string
    checked: boolean
    toggleEditMode: (isEditMode: boolean) => void
}

export const EditTodoModal: React.FC<IProps> = props => {

    const {
        id,
        title,
        checked,
        toggleEditMode
    } = props;

    const
        dispatch = useDispatch(),
        [text, setText] = useState(title);

    const editTitle = () => {
        dispatch(editTodo(id, text, checked));
        toggleEditMode(false);
    };

    const cancelEditTodo = () => {
        toggleEditMode(false);
    };

    return (
        <div className={s.EditTodoModal}>
            <div className={s.EditTodoModal__card}>
                <h2 className={s.EditTodoModal__card_title}>Edit {'todo'}</h2>
                <Input
                    value={text}
                    onChangeText={(str) => setText(str)}
                    label={'Enter task title'}
                />
                <div className={s.EditTodoModal__card_buttons}>
                    <Button
                        title={'Cancel'}
                        type={'secondary'}
                        onClick={cancelEditTodo}
                    />
                    <Button
                        title={'Edit'}
                        onClick={editTitle}
                    />
                </div>
            </div>
        </div>
    );
};