import React, {useState, useEffect, useRef} from "react"
import {useClickAway} from 'react-use'
import { Option } from "../../../types";

import cls from './Select.module.css'

interface SelectProps {
    selected?: Option;
    options: Option[];
    placeholder: string;
    action?(value: string | number, title: string): void;
}

const Select = ({selected, options, placeholder, action}: SelectProps) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)
    let [toggle, setToggle] = useState<string>(placeholder)
    const ref = useRef(null)
    useClickAway(ref, () => {
        setIsOpen(false)
    });

    function handleClick({title, value}: Option) {
        setIsOpen(false)
        setToggle(title)
        action?.(value, title)
    }

    let classes = [cls.select]
    if (isOpen) classes.push(cls.open)
    
    return (
        <div className={classes.join(' ')} ref={ref}>
            <div style={{minWidth: `${options.reduce((acc, op) => acc < op.title.length ? op.title.length : acc, -Infinity) * 10 + 20}px`}} 
                 className={cls.selected} 
                 onClick={(e: React.MouseEvent) => {setIsOpen(!isOpen && Boolean(options.length))}}>
                    {toggle}
            </div>
            {
                <div className={cls.dropdown}>
                    <ul className={cls.options}>
                        {options.map(({title, value}) => <option className = {cls.option} key={value} value={value} onClick={() => handleClick({title, value})}>{title}</option>)}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Select