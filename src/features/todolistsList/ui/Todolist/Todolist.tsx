import {Delete} from "@mui/icons-material"
import {Button, IconButton} from "@mui/material"
import {AddItemForm, EditableSpan} from "common/components"
import {TaskStatuses} from "common/enums"
import {useAppDispatch} from "common/hooks"
import React, {useCallback, useEffect} from "react"

import {Task} from "./Task/Task"
import {changeTodolistTitle, removeTodolist, TodolistDomainType, todolistsActions} from "../../model/todolistsSlice";
import {TaskType} from "../../api/tasksApiTypes";
import {fetchTasks, addTask} from "../../model/tasksSlice";

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.todolist.id))
    }, [])

    const addTaskCb = (title: string) => {
        dispatch(addTask({title, todolistId: props.todolist.id}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolist(props.todolist.id))
    }

    const changeTodolistTitleCb = (title: string) => {
        dispatch(changeTodolistTitle({id: props.todolist.id, title}))
    }

    const onAllClickHandler = () => dispatch(todolistsActions.changeTodolistFilter({
        id: props.todolist.id,
        filter: "all"
    }))

    const onActiveClickHandler = () => dispatch(todolistsActions.changeTodolistFilter({
        id: props.todolist.id,
        filter: "active"
    }))

    const onCompletedClickHandler = () => dispatch(todolistsActions.changeTodolistFilter({
        id: props.todolist.id,
        filter: "completed"
    }))

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCb}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCb} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button
                    variant={props.todolist.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={props.todolist.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
})
