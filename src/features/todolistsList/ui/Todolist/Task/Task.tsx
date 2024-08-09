import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@mui/material"
import {Delete} from "@mui/icons-material"
import {EditableSpan} from "common/components"
import {TaskStatuses} from "common/enums"
import {tasksThunks} from "../../../model/tasksSlice";
import {useAppDispatch} from "../../../../../common/hooks";
import {TaskType} from "../../../api/tasksApiTypes";

type Props = {
    task: TaskType
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo(({task, changeTaskTitle, changeTaskStatus}: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => dispatch(tasksThunks.removeTask({
        taskId: task.id,
        todolistId: task.todoListId
    }))


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(
            task.id,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
            task.todoListId,
        )
    }

    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue, task.todoListId)
    }


    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                      onChange={onChangeHandler}/>

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
