import React, { useState, useEffect } from 'react'
import useInfo from '../../Hooks/useInfo'
import { Edge, Option, IGetAll } from '../../types'
import Button from '../UI/Button/Button'
import Select from '../UI/Select/Select'
import Canvas from '../Canvas/Canvas'
import Modal from '../Modal/Modal'
import ModalSetGraph from './ModalSetGraph/ModalSetGraph'
import SaveGraph from '../SaveGraph/SaveGraph'

import cls from './Main.module.css'

import Graph from '../../modules/Graph/Graph'
import { parseAdjacencyMatrix, parseListOfAdjacency, parseListOfEdges } from '../../modules/Parser/Parser'
import API from '../../API/api'
import { Algorithm, AlgorithmAntColony, AlgorithmCheckerConnectivity, AlgorithmFindFlow, AlgorithmFindPairs, AlgorithmSpanningTree } from '../../modules/Algorithm/Algorithm'

const Main = () => {
    let [graph, setGraph] = useState<Graph>(new Graph([]))
    let [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    let [flag, setFlag] = useState<'m' | 'e' | 'l'>('m') // флаг по которому определяется задание графа
    let [names, setNames] = useState<Option[]>([])

    let [name, setName] = useState<string>('Выберите алгоритм')
    let [info, status, setInfo] = useInfo('', 'default')

    let [alg, setAlg] = useState<Algorithm>()

    async function fetchNames() {
        try {
            const data = (await API.get<IGetAll[]>('GraphStorage/GetAll')).data
            let newNames: Option[] = []
            data.forEach(e => newNames.push({ title: e.name, value: e.id }))
            setNames(newNames)
        } catch (e) { console.log(e) }
    }

    useEffect(() => {
        fetchNames()
    }, [])

    useEffect(() => {
        if (!alg) setInfo('', 'default')
    }, [alg])

    let optionsSetGraph: Option[] = [
        { title: 'Матрица смежности', value: 'm' },
        { title: 'Список ребер', value: 'e' },
        { title: 'Список смежности', value: 'l' }
    ]

    let optionsSelectAlg: Option[] = [
        { title: 'Компоненты связности', value: 'CheckerConnectivity' },
        { title: 'Алгоритм Краскала', value: 'Kruskal' },
        { title: 'Алгоритм Прима', value: 'Prim' },
        { title: 'Алгоритм Борувки', value: 'Boruvka' },
        { title: 'Алгоритм муравьиной колонии', value: 'AntColony' },
        { title: 'Максимальный поток', value: 'FindFlow' },
        { title: 'Максимальное паросочетание', value: 'FindPairs' }
    ]

    const dictParse = {
        'm': parseAdjacencyMatrix,
        'e': parseListOfEdges,
        'l': parseListOfAdjacency
    }

    const dictAlgorithm = {
        'CheckerConnectivity': AlgorithmCheckerConnectivity,
        'Kruskal': AlgorithmSpanningTree,
        'Prim': AlgorithmSpanningTree,
        'Boruvka': AlgorithmSpanningTree,
        'AntColony': AlgorithmAntColony,
        'FindFlow': AlgorithmFindFlow,
        'FindPairs': AlgorithmFindPairs
    }

    async function actionSelectAlgorithm(value: string) {
        setAlg(new dictAlgorithm[value as keyof typeof dictAlgorithm](graph, setInfo, value));
    }

    function actionSelectSetGraph(value: string): void {
        setIsVisibleModal(true)
        setFlag(value as 'm' | 'e' | 'l')
    }

    async function actionSelectGraph(value: number) {
        try {
            const response = await API.get<Edge[]>('GraphStorage/GetById', { params: { id: value } })
            setGraph(new Graph(response.data))
        } catch (e) { console.log(e) }
    }

    function createGraph(text: string) {
        setGraph(new Graph(dictParse[flag](text)))
        setIsVisibleModal(false)
    }

    function clearCanvas() {
        setAlg(undefined)
        setGraph(new Graph([]))
    }

    return (
        <div>
            {
                isVisibleModal &&
                <Modal setVisible={setIsVisibleModal}>
                    <ModalSetGraph f={flag!} createGraph={createGraph} />
                </Modal>
            }
            <main>
                <div className='container'>
                    <h1>Алгоритмы теории графов</h1>
                    <p>Визуализация графа. Реализация алгоритмов на нём.</p>
                    <div className={cls.options}>
                        <Select action={actionSelectSetGraph} options={optionsSetGraph} placeholder='Задание графа' />
                        <Select action={actionSelectAlgorithm} options={optionsSelectAlg} placeholder='Выбрать алгоритм' />
                        <Select action={actionSelectGraph} options={names} placeholder='Выбрать граф' />
                        <Button text='Очистить холст' onClick={clearCanvas}/>
                    </div>
                    <Canvas graph={graph} name={name} info={info} status={status} algorithm={alg} setAlg={setAlg}/>
                    <SaveGraph graph={graph} fetchNames={fetchNames} setInfo={setInfo} />
                </div>
            </main>
        </div>
    );
}

export default Main