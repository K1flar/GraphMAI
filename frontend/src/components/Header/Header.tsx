import React, { ReactElement } from "react"

import cls from './Header.module.css'

const Header = () => {
    return (
        <div>
            <header>
                <div className={`container ${cls.container}`}>
                    <a href="#">
                        <img src="./img/logo.svg" alt="" />
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Header;
