import { Edge } from '../types'

export  function parseAdjacencyMatrix(text: string): Edge[] {
    let edges: Edge[] = []

    // удаление запятых если они есть
    text = text.replace(/,/g, '')

    // "добавление вершин"
    let lines: string[] = text.trim().split('\n')
    for (let i = 1; i <= lines.length; i++) edges.push({u: i, v: i, weight: 0})
    
    // добавление остальных ребер
    for (let i = 1, str = lines[0]; i <= lines.length; str = lines[i++]) {
        let weights = str.trim().split(' ').map(e => parseInt(e.trim()))
        for (let j = 1, w = weights[0]; j <= weights.length; w = weights[j++])
            if(w !== 0 && i !== j) edges.push({u: i, v: j, weight: w})
        } 
        
    return edges
}

export function parseListOfEdges(text: string): Edge[] {
    return text.replace(/,/g, '').trim().split('\n').map(s => {
        let edge = s.trim().split(' ').map(el => parseInt(el))
        return {u: edge[0], v: edge[1], weight: edge[2] === undefined ? 1 : edge[2]}
    })
}

export  function parseListOfAdjacency(text: string): Edge[] {
    let edges: Edge[] = []

    // удаление запятых если они есть
    text = text.replace(/,/g, '')

    let lines: string[] = text.split('\n')
    for (let i = 1; i <= lines.length; i++) {
        // добавление инцидентных ребер
        let vertices: string[] = lines[i - 1].trim().split(' ')
        
        for (let v of vertices) {
            if (v!== '') edges.push({u: i, v: parseInt(v), weight: 1})
        }       
    }

    return edges
}