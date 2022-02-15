import React from 'react';
import s from './RemoveTodoModal.module.css';
import {useDispatch} from 'react-redux';
import {Button} from '../../common/Button/Button';
import {deleteTodo} from '../../../store/reducers/todos-reducer/todos-reducer';

interface IProps {
    id: number
    toggleRemoveMode: (isRemoveMode: boolean) => void
}

export const RemoveTodoModal: React.FC<IProps> = props => {

    const
        {id, toggleRemoveMode} = props,
        dispatch = useDispatch();

    const deleteThisTodo = () => {
        dispatch(deleteTodo(id));
        toggleRemoveMode(false);
    };

    const cancelDeleteThisResident = () => {
        toggleRemoveMode(false);
    };

    return (
        <div className={s.removeResidentModal}>
            <div className={s.removeResidentModal__card}>
                <h2 className={s.removeResidentModal__title}>
                    Remove {'todo'}
                </h2>
                <p className={s.removeResidentModal__text}>
                    Are you sure you want to remove the resident?
                </p>
                <div className={s.removeResidentModal__card_buttonBlock}>
                    <Button
                        onClick={cancelDeleteThisResident}
                        type={'secondary'} title={'No'}
                    />
                    <Button
                        onClick={deleteThisTodo}
                        title={'Yes'}
                    />
                </div>
            </div>
        </div>
    );
};