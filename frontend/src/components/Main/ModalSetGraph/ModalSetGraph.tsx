import React, { useState } from 'react'

import TextArea from '../../UI/TextArea/TextArea'
import Button from '../../UI/Button/Button'

import cls from './ModalSetGraph.module.css'
import Graph from '../../../modules/Graph/Graph';

interface ModalSetGraphProps {
    f: 'm' | 'e' | 'l';
    createGraph(text: string): void;
}

const ModalSetGraph = ({ f, createGraph }: ModalSetGraphProps) => {
    let [text, setText] = useState<string>('')

    let dictSetGraph = {
        'm': {
            title: 'Введите матрицу смежности',
            placeholder: 'Матрица смежности'
        },
        'e': {
            title: 'Введите список ребер',
            placeholder: 'Список ребер'
        },
        'l': {
            title: 'Введите список смежности',
            placeholder: 'Список смежности'
        }
    }

    return (
        <div className={cls.modal}>
            <div className={cls.title}>
                <h3>{dictSetGraph[f].title}</h3>
            </div>
            <div className={cls.content}>
                <TextArea placeholder={dictSetGraph[f].placeholder} value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)}/>
                <Button text='Сохранить' onClick={() => createGraph(text)}/>
            </div>
        </div>
    );
}

export default ModalSetGraph