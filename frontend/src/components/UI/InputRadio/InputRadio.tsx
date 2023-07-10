import React from "react"

import cls from './InputRadio.module.css'

interface InputRadioProps extends React.HTMLAttributes<any>{
    id: string;
    name: string;
    value: number | string;
    label: string;
}

const InputRadio = ({id, name, value, label, ...props}: InputRadioProps) => {
    return (
        <div className={cls.inputRadio}>
            <input className={cls.input} type="radio" id={id} name={name} value={value} {...props}/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default InputRadio