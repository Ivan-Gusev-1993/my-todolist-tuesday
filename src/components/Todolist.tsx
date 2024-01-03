import React from 'react';
import {FilterButtonValue} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeButton:(value:FilterButtonValue)=>void
}

export const Todolist = (props: TodolistPropsType) => {


            const onClickButtonAllHandler = (value:FilterButtonValue) => {
                props.changeButton(value)
            }
             const onClickButtonActiveHandler = (value:FilterButtonValue) => {
                props.changeButton(value)
            }
            const onClickButtonCompletedHandler = (value:FilterButtonValue) => {
                props.changeButton(value)
            }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        const onClickButtonHandler = () => {
                            props.removeTask(el.id)
                        }
                        return (
                            <li key={el.id}>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={() => {onClickButtonHandler()}}>x</button>
                            </li>
                        )
                    })}

                </ul>
                <div>
                    <button onClick={()=>{onClickButtonAllHandler('all')}}>All</button>
                    <button onClick={()=>{onClickButtonActiveHandler('active')}}>Active</button>
                    <button onClick={()=>{onClickButtonCompletedHandler('completed')}}>Completed</button>
                </div>
            </div>
        </div>
    );
};

