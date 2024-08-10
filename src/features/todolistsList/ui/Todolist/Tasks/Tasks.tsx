import React from 'react';
import {Task} from "./Task/Task";
import {TaskType} from "../../../api/tasksApiTypes";
import {TaskStatuses} from "../../../../../common/enums";
import {TodolistDomainType} from "../../../model/todolistsSlice";
type Props = {
    tasks: TaskType[]
    todolist: TodolistDomainType
}

export const Tasks = ({tasks, todolist}: Props) => {

    let tasksForTodolist = tasks

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
    }

    return (
        <>
            {tasksForTodolist.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                />
            ))}
        </>
    );
};
