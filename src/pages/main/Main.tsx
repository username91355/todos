import React from 'react';
import s from './Main.module.css';
import logo from './../../assets/img/logo.png';

export const Main: React.FC = () => {
    return (
        <div className={s.main}>
            <div className={s.main__img_block}>
                <img className={s.main__img} src={logo} alt='logo'/>
            </div>
            <div className={s.main__description}>
                <p>
                    This little app is designed to help you
                    organize your day. You can start scheduling
                    tasks right now.
                </p>
            </div>
        </div>
    );
};