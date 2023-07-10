import React, { Children, ReactNode } from "react"

import cls from './Modal.module.css'

interface ModalProps {
    children: ReactNode;
    setVisible(a: boolean): void;
}

const Modal = ({children, setVisible}: ModalProps) => {
    return (
        <div className={cls.modal} onClick={() => setVisible(false)}>
            <div className={cls.children} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal