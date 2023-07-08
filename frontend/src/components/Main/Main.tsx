import React from 'react'
import Select from '../UI/select/Select'
import Canva from '../Canva/Canva'
import cls from './Main.module.css'

const Main = () => {
    return (
        <div>
            <main>
                <div className='container'>
                    <h1>Алгоритмы теории графов</h1>
                    <p>Визуализация графа. Реализация алгоритмов на нём.</p>
                    <div className={cls.options}>
                        <Select toggle='Задание графа' list={['Матрица смежности', 'Список ребер', 'Список смежности']} />
                        <Select toggle='Выбрать алгоритм' list={['Компоненты связности', 'Остовное дерево', 'Гамильтонов цикл', 'Максимальный поток', 'Максимальное паросочетание']} />
                    </div>
                    <Canva name='Выберете алгоритм'/>
                </div>
            </main>
        </div>
    );
}

export default Main