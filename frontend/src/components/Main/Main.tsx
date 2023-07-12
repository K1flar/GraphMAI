import React, { useState } from 'react'
import Select from '../UI/Select/Select'
import Canvas from '../Canvas/Canvas'
import cls from './Main.module.css'

import Graph from '../../modules/Graph/Graph'
import { parseAdjacencyMatrix, parseListOfAdjacency, parseListOfEdges } from '../../modules/Parser/Parser'

const Main = () => {
    let [graph, setGraph] = useState<Graph>(new Graph([]))
    
    return (
        <div>
            <main>
                <div className='container'>
                    <h1>Алгоритмы теории графов</h1>
                    <p>Визуализация графа. Реализация алгоритмов на нём.</p>
                    <div className={cls.options}>
                        <Select options = {[{title: 'Матрица смежности', value: 'm'}, {title: 'Список ребер', value: 'e'}, {title: 'Список смежности', value: 'l'}]} placeholder='Задание графа'/>    
                        <Select options = {[{title: 'Компоненты связности', value: 0}, {title: 'Остовное дерево', value: 1}, {title: 'Гамильтонов цикл', value: 2}, {title: 'Максимальный поток', value: 3}, {title: 'Максимальное паросочетание', value: 4}]} placeholder='Выбрать алгоритм'/>                            
                    </div>
                    <Canvas graph={graph} name='Выберете алгоритм' />
                </div>
            </main>
        </div>
    );
}

export default Main