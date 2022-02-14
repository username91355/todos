import React, {useEffect, useMemo, useState} from 'react';
import s from './Todos.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../../store/reducers/todos-reducer/todos-reducer';
import {Button} from '../../components/common/Button/Button';
import {AddTodoModal} from '../../components/modal/AddTodoModal/AddTodoModal';
import {Todo} from './todo/Todo';
import { Paginator } from '../../components/common/Pagination/Paginator';

export const Todos = () => {

        const dispatch = useDispatch();
        const todos = useSelector((state: any) => state.todos.todos);
        const [createMode, setCreateMode] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);

        const leftBorder = useMemo(() => {
            return (currentPage - 1) * 10;
        }, [currentPage]);

        const rightBorder = useMemo(() => {
            return currentPage * 10;
        }, [currentPage]);


        useEffect(() => {
            if (!todos.length) {
                dispatch(fetchTodos());
            }
        }, [dispatch]);

        const toggleCreateMode = () => {
            setCreateMode(!createMode);
        };


        const totalTodos = todos.length;

        const totalPages = Math.ceil(totalTodos / 10);

        let pages = [];
        for (let i = 0; i <= totalPages; i += 1) {
            pages.push(i)
        }

        return (
            <div>
                <div className={s.todo__addNew}>
                    {createMode && <AddTodoModal toggleCreateMode={toggleCreateMode}/>}
                    <Button sizebtn={'large'} title={'Add task'} onClick={toggleCreateMode}/>
                </div>
                {[...todos]
                    .slice(leftBorder, rightBorder)
                    .map((i: any) => <Todo
                        key={i.id}
                        id={i.id}
                        title={i.title}
                        completed={i.completed}
                    />)}
                <Paginator currentPage={currentPage}
                           totalItems={totalTodos}
                           setCurrentPage={setCurrentPage}/>
            </div>
        );
    }
;