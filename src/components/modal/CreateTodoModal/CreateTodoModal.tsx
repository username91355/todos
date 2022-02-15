import React, {useState} from 'react';
import s from './CreateTodoModal.module.css';
import {useDispatch} from 'react-redux';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {createTodo} from '../../../store/reducers/todos-reducer/todos-reducer';

interface IProps {
    toggleCreateMode: (isCreateMode: boolean) => void
}

export const CreateTodoModal: React.FC<IProps> = props => {

    const
        {toggleCreateMode} = props,
        dispatch = useDispatch(),
        [title, setTitle] = useState('');

    const addTask = () => {
        dispatch(createTodo(title));
        toggleCreateMode(false);
    };

    const cancelAddResident = () => {
        toggleCreateMode(false);
    };

    return (
        <div className={s.AddResidentModal}>
            <div className={s.AddResidentModal__card}>
                <h2
                    className={s.AddResidentModal__card_title}
                >
                    Add new {'todo'}
                </h2>
                <Input
                    value={title}
                    onChangeText={setTitle}
                    label={'Enter task title'}
                />
                <div className={s.AddResidentModal__card_buttons}>
                    <Button
                        title={'Cancel'}
                        type={'secondary'}
                        onClick={cancelAddResident}
                    />
                    <Button
                        title={'Create'}
                        onClick={addTask}
                    />
                </div>
            </div>
        </div>
    );
};