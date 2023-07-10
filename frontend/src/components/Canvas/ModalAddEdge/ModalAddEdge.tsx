import React, {useState} from "react"
import InputText from "../../UI/InputText/InputText"
import InputRadio from "../../UI/InputRadio/InputRadio"
import Button from "../../UI/Button/Button"

import cls from './ModalAddEdge.module.css'
import "../../../styles/App.css"
import InteractionCanvas from "../../../modules/InteractionCanvas/InteractionCanvas"

interface ModalAddEdgeProps {
    canv: InteractionCanvas
    setVisible(a: boolean): void;
}

const ModalAddEdge = ({canv, setVisible}: ModalAddEdgeProps) => {
    let [weight, setWeight] = useState<string>('')
    let [isDirected, setIsDirected] = useState<boolean>(true)

    function closeModalAndAddEdge() {
        let [u, v] = canv.selectedVertices!
        setVisible(false)
        canv.addNewEdge(u, v, parseInt(weight) || 1, isDirected)
        canv.resetSelectedVertices()
    }

    return (
        <div className={cls.modal}>
            <div className={cls.name}>
                <h3>Добавить ребро</h3>
            </div>
            <div className={cls.content}>
                <InputText placeholder='Вес' value={weight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}/>
                <div className={cls.inputBlock}>
                    <InputRadio id='edge1' name='edge' value='directed' label='Ориентированный' defaultChecked={isDirected} onClick={() => setIsDirected(true)}/>
                    <InputRadio id='edge2' name='edge' value='directed' label='Неориентированный' defaultChecked={!isDirected} onClick={() => setIsDirected(false)}/>
                </div>

                <div className={cls.btn}>
                    <Button text='Сохранить' onClick={closeModalAndAddEdge}/>
                </div>
            </div>
        </div>
    );
}

export default ModalAddEdge