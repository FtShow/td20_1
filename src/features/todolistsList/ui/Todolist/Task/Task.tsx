import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@mui/material"
import {Delete} from "@mui/icons-material"
import {EditableSpan} from "common/components"
import {TaskStatuses} from "common/enums"
import {tasksThunks} from "../../../model/tasksSlice";
import {useAppDispatch} from "../../../../../common/hooks";
import {TaskType} from "../../../api/tasksApiTypes";

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => dispatch(tasksThunks.removeTask({
        taskId: props.task.id,
        todolistId: props.task.todoListId
    }))


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(
            props.task.id,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
            props.task.todoListId,
        )
    }

    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.task.todoListId)
    }


    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary"
                      onChange={onChangeHandler}/>

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
