import React, {useState} from 'react'
import InputText from '../UI/InputText/InputText'
import Button from '../UI/Button/Button'

import cls from './SaveGraph.module.css'
import Graph from '../../modules/Graph/Graph'

interface SaveGraphProps {
    graph: Graph;
}

const SaveGraph = ({graph}: SaveGraphProps) => {
    let [name, setName] = useState<string>('')
    return (
        <div className={cls.saveGraph}>
            <InputText placeholder='Название' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <Button text='Сохранить граф' onClick={() => console.log(graph)}/>
        </div>
    );
}

export default SaveGraph