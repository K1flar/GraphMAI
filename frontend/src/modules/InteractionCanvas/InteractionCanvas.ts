import Vertex from "./Vertex"

class InteractionCanvas {
    private readonly _canvas: HTMLCanvasElement
    private readonly _ctx: CanvasRenderingContext2D
    
    private _countVertices: number
    private _vertices: Vertex[] = []

    constructor(canvas: HTMLCanvasElement) {
        // настройка холста
        this._canvas = canvas as HTMLCanvasElement
        this._ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        this._canvas.width = canvas.clientWidth
        this._canvas.height = canvas.clientHeight 
        
        // настройка текста
        this._ctx.font = '14px Verdana'
        this._ctx.textAlign = 'center'
        this._ctx.textBaseline = 'middle'

        this._countVertices = 0
    }

    public handleClick(e: React.MouseEvent) {
        let [x, y] = [e.pageX - this._canvas.offsetLeft, e.pageY - this._canvas.offsetTop]

        let v = new Vertex(++this._countVertices, x, y)
        this._vertices.push(v)
        this.drawVertex(v)
        console.log(v)
    }

    private drawVertex(v: Vertex): void {
        // отрисовка круга
        this._ctx.beginPath()
        this._ctx.arc(v.x, v.y, 17, 0, 2 * Math.PI)
        this._ctx.fillStyle = '#3C4CDC'
        this._ctx.fill()
        // отрисовка номера вершины
        this._ctx.fillStyle = '#fff'
        this._ctx.fillText(`${v.n}`, v.x, v.y)
        this._ctx.closePath()
    }
}

export default InteractionCanvas