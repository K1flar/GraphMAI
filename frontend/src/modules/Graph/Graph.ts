import { Edge } from '../types'

class Graph {
    private _edges: Edge[] = []

    constructor(edges: Edge[]) {
        this._edges = edges
    }

    public get edges(): Edge[] { return JSON.parse(JSON.stringify(this._edges)) }

    public addEdge(u: number, v: number, weight: number): void {
        this._edges.push({u, v, weight})
    }
}

export default Graph