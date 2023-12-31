import { Algorithm } from "../Algorithm/Algorithm"
import Graph from "../Graph/Graph"
import Vertex from "./Vertex"

import { Edge } from "../../types"

class InteractionCanvas {
    private readonly _canvas: HTMLCanvasElement
    private readonly _ctx: CanvasRenderingContext2D
    private readonly _width: number
    private readonly _height: number

    private readonly _graph: Graph

    private _countVertices: number
    private _vertices: Vertex[] = []
    private _verticesOnCanvas: boolean[] = []

    private _isSelectVertex: boolean = false
    private _selectedVertices: Vertex[] = []

    private _rv: number = 17 // радиус вершины

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        // настройка холста
        this._canvas = canvas as HTMLCanvasElement
        this._ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        this._width = canvas.clientWidth
        this._height = canvas.clientHeight
        this._canvas.width = this._width
        this._canvas.height = this._height

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

    public handleClick(e: React.MouseEvent, setIsVisibleModal: (a: boolean) => void, alg?: Algorithm, setAlg?: (a: Algorithm | undefined) => void) {
        let [x, y] = [e.pageX - this._canvas.offsetLeft, e.pageY - this._canvas.offsetTop]

        // снять выделение с несозданного ребра
        if (this._isSelectVertex && this._selectedVertices.length === 2) this.resetSelectedVertices()

        // проверить, что клик произошел на вершину
        let sv: Vertex | undefined = this.selectedVertex(x, y)
        if (!sv) {
            if (alg) {
                setAlg!(undefined)
                this.drawGraph(this._graph)
                return
            }
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
            if (alg && alg.dataCollected()) {
                alg.displayResult(this)
                setAlg!(undefined)
                this.drawGraph(this._graph)
            }
        }
    }

    private createNewVertexOnCanvas(x: number, y: number, n: number): Vertex {
        // создание вершины
        let v = new Vertex(n, x, y)
        this._vertices.push(v)
        this._countVertices++
        // отрисовка вершины
        this.drawVertex(v)
        // добавление в существующие
        this._verticesOnCanvas[n] = true
        return v
    }

    private addNewVertex(x: number, y: number, n?: number): void {
        // определение номера вершины
        if (!n) n = this._countVertices + 1
        if (this._verticesOnCanvas[n]) n = this._verticesOnCanvas.length
        // добавление в граф
        this._graph.addEdge(n, n, 0)
        // добавление на canvas
        this.createNewVertexOnCanvas(x, y, n)
        console.log(this._countVertices)
    }

    public drawVertex(v: Vertex, color?: string): void {
        // отрисовка круга
        this._ctx.beginPath()
        this._ctx.arc(v.x, v.y, this._rv, 0, 2 * Math.PI)
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
        // добавление ребра в граф
        this._graph.addEdge(u, v, weight)
        if (!isDirected) this._graph.addEdge(v, u, weight)
        console.log(this._graph)
        // отрисовка ребра
        this.drawEdge(this._selectedVertices[0], this._selectedVertices[1], weight, isDirected)
    }

    private drawEdge(u: Vertex, v: Vertex, weight: number, isDirected: boolean = true, color?: string): void {
        //if (u.n === v.n) return

        let dx = v.x - u.x // перемещение по x
        let dy = v.y - u.y // перемещение по y

        // цвет ребра
        if (!color) {
            let r = ((50 + weight % 255) % 255).toString(16).padStart(2, '0')
            let g = ((10 + weight % 255) % 255).toString(16).padStart(2, '0')
            let b = (200).toString(16).padStart(2, '0')
            let colorEdge = `#${r}${g}${b}`
            this._ctx.strokeStyle = colorEdge
        } else {
            this._ctx.strokeStyle = color
        }
        

        this._ctx.beginPath()

        // отрисовка ребра
        this._ctx.lineWidth = 3
        this._ctx.lineCap = 'round'
        this._ctx.moveTo(u.x, u.y)
        this._ctx.lineTo(v.x, v.y)
        // если дуга - отрисовка стрелки
        if (isDirected) {
            // длина стрелки и угол от прямой
            let [lp, ap] = [10, Math.PI / 6]
            // координаты стрелки
            let [xp, yp] = [v.x - Math.cos(Math.atan2(dy, dx)) * this._rv, v.y - Math.sin(Math.atan2(dy, dx)) * this._rv]
            this._ctx.moveTo(xp, yp)
            this._ctx.lineTo(xp - Math.cos(Math.atan2(dy, dx) - ap) * lp, yp - Math.sin(Math.atan2(dy, dx) - ap) * lp)
            this._ctx.moveTo(xp, yp)
            this._ctx.lineTo(xp - Math.sin(Math.atan2(dx, dy) - ap) * lp, yp - Math.cos(Math.atan2(dx, dy) - ap) * lp)

        }
        this._ctx.stroke()

        // значение веса
        this._ctx.fillStyle = '#589FF2'
        let rectWidth = 7 * (`${weight}`).length + 18
        let rectHeight = 25
        this.drawRoundRect((u.x + v.x) / 2 - rectWidth / 2, (u.y + v.y) / 2 - rectHeight / 2, rectWidth, rectHeight, 5)
        this._ctx.fill()
        this._ctx.fillStyle = '#272736'
        this._ctx.fillText(`${weight}`, (u.x + v.x) / 2, (u.y + v.y) / 2)

        this.drawVertex(u, color)
        this.drawVertex(v, color)
        this._ctx.closePath()
    }

    private drawRoundRect(x: number, y: number, w: number, h: number, r: number): void {
        this._ctx.beginPath()
        this._ctx.moveTo(x, y)
        this._ctx.arcTo(x + w, y, x + w, y + r, r)
        this._ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
        this._ctx.arcTo(x, y + h, x, y + h - r, r)
        this._ctx.arcTo(x, y, x + r, y, r)
        this._ctx.closePath()
    }

    public drawGraph(graph: Graph = this._graph, color?: string): void {
        // очистка canvas
        this._ctx.clearRect(0, 0, this._width, this._height)
        for (let e of graph.edges) {
            let u: Vertex = this.vertexOnCanvas(e.from) || this.createNewVertexOnCanvas(Math.random() * (this._width - 2 * this._rv) + this._rv, Math.random() * (this._height - 2 * this._rv) + this._rv, e.from)
            let v: Vertex = this.vertexOnCanvas(e.to) || this.createNewVertexOnCanvas(Math.random() * (this._width - 2 * this._rv) + this._rv, Math.random() * (this._height - 2 * this._rv) + this._rv, e.to)

            if (graph.isDirected(u.n, v.n)) this.drawEdge(u, v, e.weight, true, color)
            else this.drawEdge(u, v, e.weight, false, color)
        }
        console.log(graph.edges)
    }

    public vertexOnCanvas(nv: number): Vertex | false {
        for (let i = 0; i < this._vertices.length; i++)
            if (this._vertices[i].n === nv) return this._vertices[i]
        return false
    }
}

export default InteractionCanvas