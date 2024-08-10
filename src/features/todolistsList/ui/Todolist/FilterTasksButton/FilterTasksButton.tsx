import React from 'react';
import {Button} from "@mui/material";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../../model/todolistsSlice";
import {useAppDispatch} from "../../../../../common/hooks";
import {TaskType} from "../../../api/tasksApiTypes";

type Props = {
    todolist: TodolistDomainType

}

export const FilterTasksButton = ({todolist}: Props) => {
    const {filter, id} = todolist
    const dispatch = useAppDispatch()

    const filterTaskHandler = (filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}))
    }


    return (
        <>
            <Button
                variant={filter === "all" ? "outlined" : "text"}
                onClick={() => filterTaskHandler('all')}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={filter === "active" ? "outlined" : "text"}
                onClick={() => filterTaskHandler('active')}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "outlined" : "text"}
                onClick={() => filterTaskHandler('completed')}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
    );
};
