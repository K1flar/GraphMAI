import React, {useState} from 'react'
import InputText from '../UI/InputText/InputText'
import Button from '../UI/Button/Button'

import cls from './SaveGraph.module.css'
import Graph from '../../modules/Graph/Graph'

import API from '../../API/api'
import { Option, ISaveGraph, status } from '../../types'

interface SaveGraphProps {
    graph: Graph;
    fetchNames(): void;
    setInfo(s: string, st: status): void;
}

const SaveGraph = ({graph, fetchNames, setInfo}: SaveGraphProps) => {
    let [name, setName] = useState<string>('')

    async function handleSubmit(e: React.MouseEvent) {
        e.stopPropagation()
        let newName = name || `Graph #${Date.now()}`
        if (!name) setName(newName)

        
        const data: ISaveGraph = {
            name: newName,
            edges: graph.edges
        }
        console.log(data)
        try {
            const resp = await API.post('GraphStorage/Save', data)
            fetchNames()
            setName('')
            setInfo(`Граф "${data.name}" сохранен`, 'ok')
            console.log(resp)
        } catch (e) {
            console.log(e)
            setInfo('Не удалось сохранить граф', 'error')
        }
    }

    return (
        <div className={cls.saveGraph}>
            <InputText placeholder='Название' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <Button text='Сохранить граф' onClick={(e: React.MouseEvent) => handleSubmit(e)}/>
        </div>
    );
}

export default SaveGraph