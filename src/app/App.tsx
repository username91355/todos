import React from 'react';
import s from './App.module.css';
import {Route, Routes} from 'react-router-dom';
import {Main} from '../pages/main/Main';
import {Todos} from '../pages/todos/Todos';
import {Header} from '../components/layout/header/Header';

export const App: React.FC = () => {

    return (
        <div className={s.app}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/todos'} element={<Todos/>}/>
            </Routes>
        </div>
    );
};
