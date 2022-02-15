import React, {useCallback, useState} from 'react';
import s from './Todo.module.css';
import {Button} from '../../../components/common/Button/Button';
import {RemoveTodoModal} from '../../../components/modal/RemoveTodoModal/RemoveTodoModal';
import {Checkbox} from '../../../components/common/Checkbox/Checkbox';
import {editTodo} from '../../../store/reducers/todos-reducer/todos-reducer';
import {useDispatch} from 'react-redux';
import {EditTodoModal} from '../../../components/modal/EditTodoModal/EditTodoModal';
import {Preloader} from '../../../components/common/Preloader/Preloader';

interface IProps {
    id: number
    title: string
    completed: boolean
    disabled: boolean
}

export const Todo: React.FC<IProps> = React.memo(props => {

    const {
        id,
        title,
        completed,
        disabled
    } = props;

    const
        dispatch = useDispatch(),
        [removeMode, setRemoveMode] = useState(false),
        [editMode, setEditMode] = useState(false);

    const toggleRemoveMode = useCallback(() => {
        setRemoveMode(!removeMode);
    }, [removeMode]);

    const toggleEditMode = useCallback(() => {
        setEditMode(!editMode);
    }, [editMode]);

    const toggleCheckedTodo = (checked: boolean) => {
        dispatch(editTodo(id, title, checked));
    };

    return (
        <div className={s.todo}>
            {removeMode &&
                <RemoveTodoModal
                    id={id}
                    toggleRemoveMode={toggleRemoveMode}
                />
            }
            {editMode &&
                <EditTodoModal
                    id={id}
                    title={title}
                    checked={completed}
                    toggleEditMode={toggleEditMode}
                />
            }
            {disabled
                ? <Preloader/>
                : <>
                    <div className={s.todo__body}>
                        <Checkbox
                            checked={completed}
                            onChangeChecked={toggleCheckedTodo}
                            disabled={disabled}
                        />
                        <p className={s.todo__title}>{title}</p>
                    </div>
                    <div className={s.todo__buttons}>
                        <Button
                            title={'Edit'}
                            type={'primary'}
                            onClick={toggleEditMode}
                            disabled={disabled}
                        />
                        <Button
                            title={'Delete'}
                            type={'secondary'}
                            onClick={toggleRemoveMode}
                            disabled={disabled}
                        />
                    </div>
                </>
            }
        </div>
    );
});