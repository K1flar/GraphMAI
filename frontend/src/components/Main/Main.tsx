import React, { useState } from 'react'
import Select from '../UI/Select/Select'
import Canvas from '../Canvas/Canvas'
import cls from './Main.module.css'

import Graph from '../../modules/Graph/Graph'

const Main = () => {
    let [graph, setGraph] = useState<Graph>(new Graph([]))

    return (
        <div>
            <main>
                <div className='container'>
                    <h1>Алгоритмы теории графов</h1>
                    <p>Визуализация графа. Реализация алгоритмов на нём.</p>
                    <div className={cls.options}>
                        <Select toggle='Задание графа' list={['Матрица смежности', 'Список ребер', 'Список смежности']} />
                        <Select toggle='Выбрать алгоритм' list={['Компоненты связности', 'Остовное дерево', 'Гамильтонов цикл', 'Максимальный поток', 'Максимальное паросочетание']} />
                    </div>
                    <Canvas graph={graph} name='Выберете алгоритм' />
                </div>
            </main>
        </div>
    );
}

export default Main