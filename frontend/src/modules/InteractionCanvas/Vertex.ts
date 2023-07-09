class Vertex {
    private _n: number
    private _x: number
    private _y: number

    constructor(n: number, x: number, y: number) {
        this._n = n
        this._x = x
        this._y = y
    }

    public get n(): number { return this._n }

    public get x(): number { return this._x }

    public get y(): number { return this._y }
}

export default Vertex