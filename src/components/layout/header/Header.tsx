import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <nav className={s.header__navbar}>
                <NavLink
                    className={({isActive}) => (
                        isActive
                            ? s.header__active_link
                            : s.header__inactive_link)}
                    to={'/'}
                >
                    Main
                </NavLink>
                <NavLink
                    className={({isActive}) => (
                        isActive
                            ? s.header__active_link
                            : s.header__inactive_link)}
                    to={'/todos'}
                >
                    Todos
                </NavLink>
            </nav>
        </header>
    );
};