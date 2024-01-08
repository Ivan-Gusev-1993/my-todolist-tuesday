import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterButtonValue = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterButtonValue
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'}
        ]
    )

    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTask(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const removeTask = (id: string) => {
        setTask(tasks.filter(t => t.id !== id))
    }

    const changeButton = (todolistId: string, value: FilterButtonValue) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: value} : tdl))
    }

    const addTask = (title: string) => {
        setTask([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {

                    let taskForTodolist = tasks;
                    if (todolist.filter === 'active') {
                        taskForTodolist = tasks.filter(t => !t.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = tasks.filter(t => t.isDone)
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeButton={changeButton}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                    />
                })
            }

        </div>
    );
}

export default App;
