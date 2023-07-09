import React, { ReactElement } from "react"

import cls from './Footer.module.css'

const Footer = () => {
    return (
        <div>
            <footer>
                <div className={`container ${cls.container}`}>
                    <a href="#">
                        <img src="./img/logo.svg" alt="" />
                    </a>
                    <span>Copyright © 2023</span>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
