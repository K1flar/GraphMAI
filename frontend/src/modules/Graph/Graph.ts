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

    public isEdge(u: number, v: number): boolean {
        for (let e of this._edges) if (u === e.u && v === e.v) return true
        return false
    }

    public isDirected(u: number, v: number): boolean {
        if (!(this.isEdge(u, v) && this.isEdge(v, u))) return true
        return false
    }
}

export default Graph