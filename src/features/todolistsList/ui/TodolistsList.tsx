import {Grid, Paper} from "@mui/material"
import {AddItemForm} from "common/components"
import {TaskStatuses} from "common/enums"
import {useAppDispatch} from "common/hooks"
import React, {useCallback, useEffect} from "react"
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import {selectIsLoggedIn} from "../../auth/model/authSlice"
import {selectTasks} from "../model/tasksSlice"
import {Todolist} from "./Todolist/Todolist"
import {addTodolist, fetchTodolists, FilterValuesType, selectTodolists,} from "../model/todolistsSlice"

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])


    const addTodolistCb = useCallback((title: string) => {
        dispatch(addTodolist(title))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolistCb}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
