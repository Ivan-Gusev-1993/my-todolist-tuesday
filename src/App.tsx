import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddNewItem} from "./components/AddNewItem";


export type FilterButtonValue = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterButtonValue
}

export type TasksArrayType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'}
        ])

    let [tasks, setTasks] = useState<TasksArrayType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        setTodolists([{id: newTodolistID, title: title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newTodolistID]:[] } )
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists( todolists.filter(td => td.id !== todolistId) )
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t) } )
    }

    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
    }

    const changeButton = (todolistId: string, value: FilterButtonValue) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: value} : tdl))
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]:[{id: v1(), title: title, isDone: false}, ...tasks[todolistId] ]})
    }

    const changeTodoTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: title} : t))
    }

    return (
        <div className="App">
            <AddNewItem  callBack={addTodolist}/>
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let taskForTodolist = allTodolistTasks

                    if (todolist.filter === 'active') {
                        taskForTodolist = allTodolistTasks.filter(t => !t.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = allTodolistTasks.filter(t => t.isDone)
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
                        removeTodolist={removeTodolist}
                        changeTodoTitle={changeTodoTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
