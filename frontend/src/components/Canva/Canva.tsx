import React from 'react'

import cls from './Canva.module.css'

interface CanvaProps {
    name: string;
    info?: string
}

const Canva = ({ name, info }: CanvaProps) => {
    return (
        <div>
            <div className={cls.canva}>
                <div className={cls.name}>
                    <h3>{name}</h3>
                </div>
                <div className={cls.info}>
                    <p>{info}</p>
                </div>
                <div className={cls.can}>
                    <canvas></canvas>
                </div>
            </div>
        </div>
    );
}

export default Canva
