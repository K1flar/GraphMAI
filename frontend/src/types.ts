export type Option = {
    title: string;
    value: string | number;
}

export interface Edge {
    from: number;
    to: number;
    weight: number;
}

export interface ISaveGraph {
    name: string;
    edges: Edge[];
}

export interface IGetAll {
    id: number;
    name: string;
}