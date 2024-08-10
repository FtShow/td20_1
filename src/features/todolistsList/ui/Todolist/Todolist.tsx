import {Delete} from "@mui/icons-material"
import {Button, IconButton} from "@mui/material"
import {AddItemForm, EditableSpan} from "common/components"
import {TaskStatuses} from "common/enums"
import {useAppDispatch} from "common/hooks"
import React, {useEffect} from "react"

import {Task} from "./Tasks/Task/Task"
import {changeTodolistTitle, removeTodolist, TodolistDomainType, todolistsActions} from "../../model/todolistsSlice";
import {TaskType} from "../../api/tasksApiTypes";
import {addTask, fetchTasks} from "../../model/tasksSlice";
import {FilterTasksButton} from "./FilterTasksButton/FilterTasksButton";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist = React.memo(function (props: Props) {
    const {todolist, tasks} = props
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasks(todolist.id))
    }, [])

    const addTaskCb = (title: string) => {
        dispatch(addTask({title, todolistId: todolist.id}))
    }


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"}/>
            <Tasks tasks={tasks} todolist={todolist}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButton todolist={todolist}/>
            </div>
        </div>
    )
})
