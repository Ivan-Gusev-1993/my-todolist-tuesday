import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtonValue, TodolistsType} from "../App";
import {AddNewItem} from "./AddNewItem";
import {EditableSpan} from "./EditableSpan";
import s from './Todolist.module.css'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeButton: (todolistId: string, value: FilterButtonValue) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterButtonValue
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodoTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onClickButtonAllHandler = () => {
        props.changeButton(props.id, 'all')
    }
    const onClickButtonActiveHandler = () => {
        props.changeButton(props.id, 'active')
    }
    const onClickButtonCompletedHandler = () => {
        props.changeButton(props.id, 'completed')
    }
    const deleteToDo = () => {
        props.removeTodolist(props.id)
    }

    const callBackAddTask = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div>
            <div>
                <div className={s.wrap}>
                    <EditableSpan title={props.title} callBack={() => {}}/>
                    <button onClick={deleteToDo}>x</button>
                </div>
                <AddNewItem callBack={callBackAddTask}/>

                <ul>
                    {props.tasks.map((el) => {
                        const onClickButtonHandler = () => {
                            props.removeTask(props.id, el.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, el.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                <input
                                    onChange={onChangeHandler}
                                    type="checkbox"
                                    checked={el.isDone}
                                />
                                <span>{el.title}</span>
                                <button onClick={onClickButtonHandler}>x</button>
                            </li>
                        )
                    })}

                </ul>
                <div>
                    <button
                        onClick={onClickButtonAllHandler}
                        className={props.filter === 'all' ? 'active-filter-button' : ''}>
                        All
                    </button>

                    <button
                        onClick={onClickButtonActiveHandler}
                        className={props.filter === 'active' ? 'active-filter-button' : ''}>
                        Active
                    </button>

                    <button
                        onClick={onClickButtonCompletedHandler}
                        className={props.filter === 'completed' ? 'active-filter-button' : ''}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

