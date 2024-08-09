import React, {ChangeEvent} from "react"
import {Checkbox, IconButton} from "@mui/material"
import {Delete} from "@mui/icons-material"
import {EditableSpan} from "common/components"
import {TaskStatuses} from "common/enums"

import {useAppDispatch} from "../../../../../common/hooks";
import {TaskType} from "../../../api/tasksApiTypes";
import s from './Task.module.css'
import {removeTask, updateTask} from "../../../model/tasksSlice";

type Props = {
    task: TaskType
}

export const Task = React.memo(({task}: Props) => {
    const {title, id: taskId, todoListId: todolistId, status}= task
        const dispatch = useAppDispatch()

        const removeTaskHandler = () => dispatch(removeTask({
            taskId,
            todolistId
        }))


        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            const status = newIsDoneValue? TaskStatuses.Completed : TaskStatuses.New
            dispatch(updateTask({
                taskId,
                domainModel: {status},
                todolistId
            }))
        }

        const changeTaskTitleHandler = (title: string) => {

            dispatch(updateTask({
                taskId,
                domainModel: {title},
                todolistId
            }))
        }


    let isTaskCompleted =status === TaskStatuses.Completed;
    return (
            <div key={taskId} className={isTaskCompleted ? s.isDone : ""}>
                <Checkbox checked={isTaskCompleted} color="primary"
                          onChange={changeTaskStatusHandler}/>

                <EditableSpan value={title} onChange={changeTaskTitleHandler}/>
                <IconButton onClick={removeTaskHandler}>
                    <Delete/>
                </IconButton>
            </div>
        )
    }
)
