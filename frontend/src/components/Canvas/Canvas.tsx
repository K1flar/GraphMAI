import React, {useState, useEffect, useRef} from 'react'
import Modal from '../Modal/Modal';
import ModalAddEdge from './ModalAddEdge/ModalAddEdge'

import cls from './Canvas.module.css'

import InteractionCanvas from '../../modules/InteractionCanvas/InteractionCanvas'
import Graph from '../../modules/Graph/Graph'

interface CanvasProps {
    graph: Graph;
    name: string;
    info?: string
}

const Canvas = ({graph, name, info }: CanvasProps) => {
    let [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)

    let canvasRef = useRef<HTMLCanvasElement>(null);
    let canvRef = useRef<InteractionCanvas>()
    useEffect(() => {
        const canvasEl = canvasRef.current 
        if (!canvasEl) return
        canvRef.current = new InteractionCanvas(canvasEl, graph)    
    }, [])

    useEffect(() => {
        canvRef.current!.drawGraph()
        console.log("чудо")
    })
    return (
        <div>
            {
            isVisibleModal &&
            <Modal setVisible={setIsVisibleModal}>
                <ModalAddEdge canv={canvRef.current!} setVisible={setIsVisibleModal}/>
            </Modal> 
            }

            <div className={cls.canva}>
                <div className={cls.name}>
                    <h3>{name}</h3>
                </div>
                <div className={cls.info}>
                    <p>{info}</p>
                </div>
                <div className={cls.can}>
                    <canvas ref={canvasRef} onMouseUp={e => canvRef.current!.handleClick(e, setIsVisibleModal)}></canvas>
                </div>
            </div>
        </div>
    );
}

export default Canvas
