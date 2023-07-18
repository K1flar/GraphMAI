import {AxiosError} from 'axios'

import API from "../../API/api"
import Graph from "../Graph/Graph"
import InteractionCanvas from "../InteractionCanvas/InteractionCanvas"

import { Edge, IAntColony, ICheckerConnectivity, IFindFlow, IFindPairs, ISpanningTree, status } from '../../types'
import axios from "axios"
import Vertex from '../InteractionCanvas/Vertex'

export abstract class Algorithm {
    public status: status = 'default'
    protected _graph: Graph
    protected _setInfo: (i: React.ReactNode, st: status) => void
    protected _url: string

    constructor(info: string, graph: Graph, setInfo: (i: React.ReactNode, st: status) => void, url: string) {
        this._setInfo = setInfo
        setInfo(info, 'default')
        this._graph = graph
        this._url = url
    }

    public abstract dataCollected(): boolean

    public fetchResponse<T, U>(data: T) {
        return API.post<U>(`Algorithm/${this._url}`, data)
    }

    public abstract displayResult(canv: InteractionCanvas): void
}

export class AlgorithmCheckerConnectivity extends Algorithm {
    constructor(graph: Graph, setInfo: (i: React.ReactNode, st: status) => void, url: string) {
        super('', graph, setInfo, url)
    }

    public dataCollected(): boolean {
        return true
    }

    public async displayResult(canv: InteractionCanvas) {
        try {
            const data = await (await this.fetchResponse<Edge[], ICheckerConnectivity>(this._graph.edges)).data
            let components: number[][] = []
            if (data.isDirected) {
                components = data.strongComponents
                this._setInfo(
                    <div>
                        {data.iWeekComponents}. {data.iStrongComponents}. 
                        <br />
                        Количество компонент сильной связности: {data.nStrongComponents}. 
                        <br />
                        Количество компонент обычной связности: {data.nWeekComponents}. 
                        <br />
                        Компоненты сильной связности:
                    </div>
                    , 'default')
            } else {
                components = data.weekComponents
                this._setInfo(
                    <div>
                        {data.iWeekComponents}. Количество компонент связности: {data.nWeekComponents}. 
                        <br/>
                        Компоненты связности:
                    </div>
                , 'default')
            }
            console.log(components)
            let rand = Math.floor(Math.random()*360)
            let n = components.length
            for (let i = 0, component = components[0]; i < n; component=components[++i]) {
                const color = `hsl(${(rand + i * 360/n) % 360}, 60%, 40%)`
                console.log(color)
                for (let v of component) {
                    canv.drawVertex(canv.vertexOnCanvas(v+1) as Vertex, color)
                }
            }
        } catch(e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
                if (e.response!.data==='') this._setInfo('Не удалось выполнить алгоритм', 'error')
                else this._setInfo(e.response!.data, 'error')
            }
            canv.drawGraph(this._graph)
        }
    }
}

export class AlgorithmSpanningTree extends Algorithm {
    constructor(graph: Graph, setInfo: (i: React.ReactNode, st: status) => void, url: string) {
        super('', graph, setInfo, url)
    }

    public dataCollected(): boolean {
        return true
    }

    public async displayResult(canv: InteractionCanvas) {
        try {
            const data = (await this.fetchResponse<Edge[], ISpanningTree>(this._graph.edges)).data
            this._setInfo(`Вес минимального остовного дерева: ${data.summ}`, 'default')
            canv.drawGraph(new Graph(data.edges), '#29C30F')
            console.log(data)
        } catch(e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
                if (e.response!.data==='') this._setInfo('Не удалось выполнить алгоритм', 'error')
                else this._setInfo(e.response!.data, 'error')
            }
            canv.drawGraph(this._graph)
        }
    }
}

export class AlgorithmAntColony extends Algorithm {
    constructor(graph: Graph, setInfo: (i: React.ReactNode, st: status) => void, url: string) {
        super('', graph, setInfo, url)
    }

    public dataCollected(): boolean {
        return true
    }

    public async displayResult(canv: InteractionCanvas) {
        try {
            const data = (await this.fetchResponse<Edge[], IAntColony>(this._graph.edges)).data
            this._setInfo(`Длина найденного гамильтонового цикла: ${data.length}`, 'default')
            canv.drawGraph(new Graph(data.edges), '#29C30F')
            console.log(data)
        } catch(e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
                if (e.response!.data==='') this._setInfo('Не удалось выполнить алгоритм', 'error')
                else this._setInfo(e.response!.data, 'error')
            }
            canv.drawGraph(this._graph)
        }
    }
}

export class AlgorithmFindFlow extends Algorithm {
    constructor(graph: Graph, setInfo: (i: React.ReactNode, st: status) => void, url: string) {
        super('', graph, setInfo, url)
    }

    public dataCollected(): boolean {
        return true
    }

    public async displayResult(canv: InteractionCanvas) {
        try {
            const data = (await this.fetchResponse<Edge[], IFindFlow>(this._graph.edges)).data
            this._setInfo(`${data.info}`, 'default')
            canv.drawGraph(new Graph(data.edges), '#29C30F')
            console.log(data)
        } catch(e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
                if (e.response!.data==='') this._setInfo('Не удалось выполнить алгоритм', 'error')
                else this._setInfo(e.response!.data, 'error')
            }
            canv.drawGraph(this._graph)
        }
    }
}

export class AlgorithmFindPairs extends Algorithm {
    constructor(graph: Graph, setInfo: (i: React.ReactNode, st: status) => void, url: string) {
        super('', graph, setInfo, url)
    }

    public dataCollected(): boolean {
        return true
    }

    public async displayResult(canv: InteractionCanvas) {
        try {
            const data = (await this.fetchResponse<Edge[], IFindPairs>(this._graph.edges)).data
            this._setInfo(`Максимальное паросочетание:`, 'default')
            canv.drawGraph(new Graph(data.edges), '#29C30F')
            console.log(data)
        } catch(e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
                if (e.response!.data==='') this._setInfo('Не удалось выполнить алгоритм', 'error')
                else this._setInfo(e.response!.data, 'error')
            }
            canv.drawGraph(this._graph)
        }
    }
}

