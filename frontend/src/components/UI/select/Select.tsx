import React, {useState, ReactNode} from "react"
import { Option } from "../../../types";

import cls from './Select.module.css'

interface SelectProps {
    selected?: Option;
    options: Option[];
    placeholder: string;
    action?(value: string | number): void;
}

const Select = ({selected, options, placeholder, action}: SelectProps) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)
    let [toggle, setToggle] = useState<string>(placeholder)

    function handleClick({title, value}: Option) {
        setIsOpen(false)
        setToggle(title)
        action?.(value)
    }

    let classes = [cls.select]
    if (isOpen) classes.push(cls.open)
    
    return (
        <div className={classes.join(' ')}>
            <div style={{minWidth: `${options.reduce((acc, op) => acc < op.title.length ? op.title.length : acc, -Infinity) * 10 + 20}px`}} 
                 className={cls.selected} 
                 onClick={() => setIsOpen(!isOpen)}>
                    {toggle}
            </div>
            {
                <ul className={cls.options}>
                    {options.map(({title, value}) => <option className = {cls.option} key={value} value={value} onClick={() => handleClick({title, value})}>{title}</option>)}
                </ul>
            }
        </div>
    );
}

export default Select