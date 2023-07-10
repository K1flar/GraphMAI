import React from "react"

import cls from './Button.module.css'

interface ButtonProps  extends React.HTMLAttributes<any>{
    text: string;
}

const Button = ({text, ...props}: ButtonProps) => {
    return (
        <div>
            <button className={cls.button} {...props}>{text}</button>
        </div>
    );
}

export default Button