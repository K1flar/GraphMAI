import React, { useState, useEffect } from 'react'
import { Option, IGetAll } from '../../types'
import Select from '../UI/Select/Select'
import Canvas from '../Canvas/Canvas'
import Modal from '../Modal/Modal'
import ModalSetGraph from './ModalSetGraph/ModalSetGraph'
import SaveGraph from '../SaveGraph/SaveGraph'

import cls from './Main.module.css'

import Graph from '../../modules/Graph/Graph'
import { parseAdjacencyMatrix, parseListOfAdjacency, parseListOfEdges } from '../../modules/Parser/Parser'
import API from '../../API/api'

const Main = () => {
    let [graph, setGraph] = useState<Graph>(new Graph([]))
    let [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    let [flag, setFlag] = useState<'m' | 'e' | 'l'>('m') // флаг по которому определяется задание графа
    let [names, setNames] = useState<Option[]>([])

    async function fetchNames(){
        try {
            const data = (await API.get<IGetAll[]>('GetAll')).data
            let newNames: Option[] = []
            data.forEach(e => newNames.push({title: e.name, value: e.id}))
            setNames(newNames)
        } catch(e) {console.log(e)}
    }

    useEffect(() => {
        fetchNames()
    }, [])

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
        setGraph(new Graph(dictParse[flag](text)))
        setIsVisibleModal(false)
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
                        <Select options={names} placeholder='Выбрать граф' />
                    </div>
                    <Canvas graph={graph} name='Выберете алгоритм' />
                    <SaveGraph graph={graph} fetchNames={fetchNames}/>
                </div>
            </main>
        </div>
    );
}

export default Main