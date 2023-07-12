import React, { useState } from 'react'
import { Option } from '../../types'
import Select from '../UI/Select/Select'
import Canvas from '../Canvas/Canvas'
import Modal from '../Modal/Modal'
import ModalSetGraph from './ModalSetGraph/ModalSetGraph'

import cls from './Main.module.css'

import Graph from '../../modules/Graph/Graph'
import { parseAdjacencyMatrix, parseListOfAdjacency, parseListOfEdges } from '../../modules/Parser/Parser'

const Main = () => {
    let [graph, setGraph] = useState<Graph>(new Graph([]))
    let [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    let [flag, setFlag] = useState<'m' | 'e' | 'l'>('m') // флаг по которому определяется задание графа

    let optionsSetGraph: Option[] = [
        { title: 'Матрица смежности', value: 'm' },
        { title: 'Список ребер', value: 'e' },
        { title: 'Список смежности', value: 'l' }
    ]

    let optionsSelectAlg: Option[] = [
        { title: 'Компоненты связности', value: 0 },
        { title: 'Остовное дерево', value: 1 },
        { title: 'Гамильтонов цикл', value: 2 },
        { title: 'Максимальный поток', value: 3 },
        { title: 'Максимальное паросочетание', value: 4 }
    ]

    let dictParse = {
        'm': parseAdjacencyMatrix,
        'e': parseListOfEdges,
        'l': parseListOfAdjacency
    }

    function actionSelectSetGraph(value: string): void {
        setIsVisibleModal(true)
        setFlag(value as 'm' | 'e' | 'l')
    }

    function createGraph(text: string) {
        console.log(graph)
        console.log("меняю")
        setGraph(new Graph(dictParse[flag](text)))
        setIsVisibleModal(false)
        console.log(graph)
    }

    return (
        <div>
            {
                isVisibleModal &&
                <Modal setVisible={setIsVisibleModal}>
                    <ModalSetGraph f={flag!} createGraph={createGraph}/>
                </Modal>
            }
            <main>
                <div className='container'>
                    <h1>Алгоритмы теории графов</h1>
                    <p>Визуализация графа. Реализация алгоритмов на нём.</p>
                    <div className={cls.options}>
                        <Select action={actionSelectSetGraph} options={optionsSetGraph} placeholder='Задание графа' />
                        <Select options={optionsSelectAlg} placeholder='Выбрать алгоритм' />
                    </div>
                    <Canvas graph={graph} name='Выберете алгоритм' />
                </div>
            </main>
        </div>
    );
}

export default Main