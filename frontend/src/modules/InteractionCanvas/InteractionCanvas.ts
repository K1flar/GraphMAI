import Graph from "../Graph/Graph"
import Vertex from "./Vertex"

class InteractionCanvas {
    private readonly _canvas: HTMLCanvasElement
    private readonly _ctx: CanvasRenderingContext2D

    private readonly _graph: Graph

    private _countVertices: number
    private _vertices: Vertex[] = []

    private _isSelectVertex: boolean = false
    private _selectedVertices: Vertex[] = []

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        // настройка холста
        this._canvas = canvas as HTMLCanvasElement
        this._ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        this._canvas.width = canvas.clientWidth
        this._canvas.height = canvas.clientHeight

        // инициализация графа
        this._graph = graph

        // настройка текста
        this._ctx.font = '14px Verdana'
        this._ctx.textAlign = 'center'
        this._ctx.textBaseline = 'middle'

        this._countVertices = 0
    }

    public get selectedVertices(): [number, number] | undefined { return this._selectedVertices ? [this._selectedVertices[0].n, this._selectedVertices[1].n] : undefined }

    public resetSelectedVertices(): void { 
        for (let v of this._selectedVertices) this.drawVertex(v)
        this._selectedVertices = [] 
        this._isSelectVertex = false
    }

    public handleClick(e: React.MouseEvent, setIsVisibleModal: (a: boolean) => void) {
        let [x, y] = [e.pageX - this._canvas.offsetLeft, e.pageY - this._canvas.offsetTop]

        // снять выделение с несозданного ребра
        if (this._isSelectVertex && this._selectedVertices.length === 2) this.resetSelectedVertices()

        // проверить, что клик произошел на вершину
        let sv: Vertex | undefined = this.selectedVertex(x, y)
        if (!sv) {
            this.addNewVertex(x, y)
        } else {
            // перекрашиваем вершину 
            this.drawVertex(sv, '#E13C3C')
            // добавляем в выбранные вершины
            this._selectedVertices.push(sv)

            // если до этого вершина не была выбрана - выделяем новую
            if (!this._isSelectVertex) {
                this._isSelectVertex = true
            }
            // иначе - добавляем ребро
            else {
                // открываем модальное окно для создания ребра
                setIsVisibleModal(true)
            }
        }
    }

    private addNewVertex(x: number, y: number): void {
        // добавление вершины
        let v = new Vertex(++this._countVertices, x, y)
        this._vertices.push(v)
        // отрисовка вершины
        this.drawVertex(v)
    }

    private drawVertex(v: Vertex, color?: string): void {
        // отрисовка круга
        this._ctx.beginPath()
        this._ctx.arc(v.x, v.y, 17, 0, 2 * Math.PI)
        this._ctx.fillStyle = color || '#3C4CDC'
        this._ctx.fill()
        // отрисовка номера вершины
        this._ctx.fillStyle = '#fff'
        this._ctx.fillText(`${v.n}`, v.x, v.y)
        this._ctx.closePath()
    }

    private selectedVertex(x: number, y: number): Vertex | undefined {
        for (let v of this._vertices)
            if (Math.sqrt(Math.pow(x - v.x, 2) + Math.pow(y - v.y, 2)) <= 17) return v

        return undefined
    }

    public addNewEdge(u: number, v: number, weight: number, isDirected: boolean): void { 
        console.log(u, v, weight, isDirected)
        // отрисовка ребра
        this.drawEdge(this._selectedVertices[0], this._selectedVertices[1], weight, isDirected)
    }

    private drawEdge(u: Vertex, v: Vertex, weight: number, isDirected: boolean = true) {

    }
}

export default InteractionCanvas