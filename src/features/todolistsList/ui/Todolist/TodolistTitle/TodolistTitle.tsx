import React from 'react';
import {EditableSpan} from "../../../../../common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitle, removeTodolist, TodolistDomainType} from "../../../model/todolistsSlice";
import {useAppDispatch} from "../../../../../common/hooks";
type Props = {
    todolist: TodolistDomainType
}
export const TodolistTitle = ({todolist}: Props) => {
    const {title, id, entityStatus} = todolist
    const dispatch = useAppDispatch()
    const removeTodolistHandler = () => {
        dispatch(removeTodolist(id))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitle({id, title}))
    }
    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
    );
};
