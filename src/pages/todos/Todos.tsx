import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './Todos.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../../store/reducers/todos-reducer/todos-reducer';
import {Button} from '../../components/common/Button/Button';
import {CreateTodoModal} from '../../components/modal/CreateTodoModal/CreateTodoModal';
import {Todo} from './todo/Todo';
import {Paginator} from '../../components/common/Pagination/Paginator';
import {TAppState} from '../../store/store';

export const Todos: React.FC = () => {

    const
        dispatch = useDispatch(),
        todos = useSelector((state: TAppState) => state.todos.todos),
        disabledTodos = useSelector((state: TAppState) => state.todos.disabledTodos),
        totalTodos = todos.length,
        [createMode, setCreateMode] = useState(false),
        [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!todos.length) {
            dispatch(fetchTodos());
        }
    }, [dispatch]);

    const toggleCreateMode = useCallback(() => {
        setCreateMode(!createMode);
    }, [createMode]);

    const leftBorder = useMemo(() => {
        return (currentPage - 1) * 10;
    }, [currentPage]);

    const rightBorder = useMemo(() => {
        return currentPage * 10;
    }, [currentPage]);

    return (
        <div>
            <div className={s.todo__addNew}>
                {createMode && <CreateTodoModal toggleCreateMode={toggleCreateMode}/>}
                <Button sizebtn={'large'} title={'Add task'} onClick={toggleCreateMode}/>
            </div>
            {[...todos]
                .slice(leftBorder, rightBorder)
                .map(i => <Todo
                    key={i.id}
                    id={i.id}
                    title={i.title}
                    completed={i.completed}
                    disabled={disabledTodos.includes(i.id)}
                />)
            }
            <Paginator
                currentPage={currentPage}
                totalItems={totalTodos}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};