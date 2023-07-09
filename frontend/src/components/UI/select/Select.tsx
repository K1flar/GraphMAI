import React, {useState} from 'react'
import cls from './Select.module.css'

interface SelectProps {
    toggle: string;
    list: string[];
}

const Select = ({toggle, list}: SelectProps) => {
    let [classes, setClasses] = useState([cls.select])

    function changeClasses() {
        let index = classes.indexOf(cls.select_show)
        if (index !== -1) {
            let t = [...classes]
            t.splice(index, 1)
            setClasses(t)
        }
        else setClasses([...classes, cls.select_show])
    }
    
    return (
        <div>
            <div onClick = {changeClasses}
                className={[...classes].join(' ')}>
                <button className={cls.toggle}>{toggle}</button>
                <div className={cls.dropdawn}>
                    <ul className={cls.options}>
                        {list.map(e => <li className={cls.option} key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Select