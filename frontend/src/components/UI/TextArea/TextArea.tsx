import React from 'react'

import cls from './TextArea.module.css'

interface TextAreaProps extends React.HTMLAttributes<any>{
    value: string;
    placeholder: string;
}

const TextArea = ({value, placeholder, ...props}: TextAreaProps) => {
    return (
        <textarea className={cls.textArea} placeholder={placeholder} defaultValue={value} {...props}>
            
        </textarea>
    );
}

export default TextArea