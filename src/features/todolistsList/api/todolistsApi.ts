import {BaseResponse} from "common/types"
import {instance} from "common/instance"
import {TodolistType, UpdateTodolistTitleArgType} from "./todolistsApiTypes";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<BaseResponse>(`todo-lists/${arg.id}`, { title: arg.title })
  },
}

