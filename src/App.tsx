import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";




export type FilterButtonValue = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterButtonValue>('all')

    const removeTask = (id: string) => {
        setTask(tasks.filter(t => t.id !== id))
    }

    let taskForTodolist = tasks;
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone)
    }

    const changeButton = (value: FilterButtonValue) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeButton={changeButton}
            />
        </div>
    );
}

export default App;
