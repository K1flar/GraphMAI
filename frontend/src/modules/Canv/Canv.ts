class Canv {
    private readonly _canvas: HTMLCanvasElement
    private readonly _ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas as HTMLCanvasElement
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D
    }

    public handleClick(e: React.MouseEvent) {
        let [x, y] = [e.pageX - this._canvas.offsetLeft, e.pageY - this._canvas.offsetTop]
        console.log(x, y)
    }
}

export default Canv