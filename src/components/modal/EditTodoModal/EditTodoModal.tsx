import React, {useState} from 'react';
import s from '../AddTodoModal/AddTodoModal.module.css';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {useDispatch} from 'react-redux';
import {editTodo} from '../../../store/reducers/todos-reducer/todos-reducer';

export const EditTodoModal: React.FC<any> = props => {

    const {id, title, checked, toggleEditMode} = props;
    const dispatch = useDispatch();
    const [text, setText] = useState(title);

    const editTitle = () => {
        dispatch(editTodo(id, text, checked));
        toggleEditMode(false);
    };

    const cancelEditTodo = () => {
        toggleEditMode(false);
    };

    return (
        <div className={s.AddResidentModal}>
            <div className={s.AddResidentModal__card}>
                <h2 className={s.AddResidentModal__card_title}>Edit task</h2>
                <Input
                    value={text}
                    onChangeText={(str) => setText(str)}
                    label={'Enter task title'}
                />
                <div className={s.AddResidentModal__card_buttons}>
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