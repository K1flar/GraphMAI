import React, { useState } from 'react'
import cls from './Select.module.css'

interface SelectProps {
    toggle: string;
    list: string[];
}

const Select = ({ toggle, list }: SelectProps) => {
    let [classes, setClasses] = useState([cls.select])
    let [newToggle, setNewToggle] = useState<string>(toggle)

    function changeClasses() {
        let index = classes.indexOf(cls.select_show)
        if (index !== -1) {
            let t = [...classes]
            t.splice(index, 1)
            setClasses(t)
        }
        else setClasses([...classes, cls.select_show])
    }

    function selectItem(item: string) {
        setNewToggle(item)
        changeClasses()
    }

    return (
        <div>
            <div className={[...classes].join(' ')}>
                <button onClick={changeClasses}
                    className={cls.toggle}>{newToggle}</button>
                <div className={cls.dropdawn}>
                    <ul className={cls.options}>
                        {list.map(e => <li className={cls.option} key={e} onClick={() => {selectItem(e)}}>{e}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Select