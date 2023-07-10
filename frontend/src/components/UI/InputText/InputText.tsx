import React from "react"

import cls from './InputText.module.css'

interface InputTextProps extends React.HTMLAttributes<any>{
    placeholder: string;
    value: string | number;
}

const InputText = ({placeholder, value, ...props}: InputTextProps) => {
    return (
        <div>
            <input className={cls.input} type="text" placeholder={placeholder} value={value} {...props}/>
        </div>
    );
}

export default InputText