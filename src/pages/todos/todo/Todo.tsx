import React, {useState} from 'react';
import s from './Todo.module.css';
import {Button} from '../../../components/common/Button/Button';
import {RemoveTodoModal} from '../../../components/modal/RemoveTodoModal/RemoveTodoModal';
import {Checkbox} from '../../../components/common/Checkbox/Checkbox';
import {editTodo} from '../../../store/reducers/todos-reducer/todos-reducer';
import {useDispatch} from 'react-redux';
import {EditTodoModal} from '../../../components/modal/EditTodoModal/EditTodoModal';

export const Todo: React.FC<any> = props => {

    const {id, title, completed} = props;
    const dispatch = useDispatch();
    const [removeMode, setRemoveMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleRemoveMode = () => {
        setRemoveMode(!removeMode);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleCheckedTodo = (checked: boolean) => {
        dispatch(editTodo(id, title, checked));
    };

    return (
        <div
            className={s.todo}
            key={id}
        >
            {removeMode && <RemoveTodoModal
                id={id}
                toggleRemoveMode={toggleRemoveMode}
            />}

            {editMode && <EditTodoModal
                id={id}
                title={title}
                checked={completed}
                toggleEditMode={toggleEditMode}
            />}
            <div className={s.todo__body}>
                <Checkbox
                    checked={completed}
                    onChangeChecked={toggleCheckedTodo}
                />
                <p className={s.todo__title}>{title}</p>
            </div>
            <div className={s.todo__buttons}>
                <Button
                    title={'Edit'}
                    type={'primary'}
                    onClick={toggleEditMode}
                />
                <Button
                    title={'Delete'}
                    type={'secondary'}
                    onClick={toggleRemoveMode}
                />
            </div>
        </div>
    );
};