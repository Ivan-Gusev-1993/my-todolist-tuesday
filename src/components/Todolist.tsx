import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtonValue, TodolistsType} from "../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeButton: (todolistId: string, value: FilterButtonValue) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterButtonValue
    id: string
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onClickButtonAllHandler = () => {
        props.changeButton(props.id, 'all')
    }
    const onClickButtonActiveHandler = () => {
        props.changeButton(props.id,'active')
    }
    const onClickButtonCompletedHandler = () => {
        props.changeButton(props.id,'completed')
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeInputHandler}
                           onKeyDown={onKeyDownHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        const onClickButtonHandler = () => {
                            props.removeTask(el.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(el.id, e.currentTarget.checked)
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

