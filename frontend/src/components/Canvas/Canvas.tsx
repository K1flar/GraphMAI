import React, { useState, useEffect, useRef } from 'react'
import Modal from '../Modal/Modal';
import ModalAddEdge from './ModalAddEdge/ModalAddEdge'

import cls from './Canvas.module.css'

import InteractionCanvas from '../../modules/InteractionCanvas/InteractionCanvas'
import Graph from '../../modules/Graph/Graph'
import { status } from '../../types';
import { Algorithm } from '../../modules/Algorithm/Algorithm';

interface CanvasProps {
    graph: Graph;
    name: string;
    info: React.ReactNode;
    status: status;
    algorithm?: Algorithm
    setAlg: (a: Algorithm | undefined) => void
}

const Canvas = ({ graph, name, info, status, algorithm, setAlg }: CanvasProps) => {
    let [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    let canvasRef = useRef<HTMLCanvasElement>(null);
    let canvRef = useRef<InteractionCanvas>()

    useEffect(() => {
        const canvasEl = canvasRef.current
        if (!canvasEl) return
        canvRef.current = new InteractionCanvas(canvasEl, graph)
    }, [])

    useEffect(() => {
        canvRef.current = new InteractionCanvas(canvasRef.current!, graph)
        canvRef.current.drawGraph()
        setAlg(undefined)
    }, [graph])

    useEffect(() => {
        if (algorithm && algorithm.dataCollected()) {
            algorithm.displayResult(canvRef.current!)
        }
    }, [algorithm])

    let dictInfoStyle = {
        'default': cls.info,
        'error': [cls.info, cls.error].join(' '),
        'ok': [cls.info, cls.ok].join(' ')
    }

    return (
        <div>
            {
                isVisibleModal &&
                <Modal setVisible={setIsVisibleModal}>
                    <ModalAddEdge canv={canvRef.current!} setVisible={setIsVisibleModal} />
                </Modal>
            }

            <div className={cls.canva}>
                <div className={cls.name}>
                    <h3>{name}</h3>
                </div>
                <div className={dictInfoStyle[status]}>
                    <p>{info}</p>
                </div>
                <div className={cls.can}>
                    <canvas ref={canvasRef} onMouseUp={e => canvRef.current!.handleClick(e, setIsVisibleModal, algorithm, setAlg )}></canvas>
                </div>
            </div>
        </div>
    );
}

export default Canvas
