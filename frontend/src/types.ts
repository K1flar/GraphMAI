export type Option = {
    title: string;
    value: string | number;
}

export type status = 'default' | 'error' | 'ok'

export type Edge = {
    from: number;
    to: number;
    weight: number;
}

export type AlgorithmsType = 'CheckerConnectivity'

export interface ISaveGraph {
    name: string;
    edges: Edge[];
}

export interface IGetAll {
    id: number;
    name: string;
}

export interface ICheckerConnectivity {
    isDirected: boolean;
    strongComponents: number[][];
    weekComponents: number[][];
    nStrongComponents: number;
    nWeekComponents: number;
    iStrongComponents: string;
    iWeekComponents: string;
}

export interface ISpanningTree {
    summ: number;
    edges: Edge[];
}

export interface IAntColony {
    length: number;
    edges: Edge[];
}

export interface IFindFlow {
    info: string;
    size: number;
    edges: Edge[];
}

export interface IFindPairs {
    edges: Edge[];
}