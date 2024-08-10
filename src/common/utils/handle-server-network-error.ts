import axios from "axios"
import { appActions } from "app/appSlice"
import { AppDispatch } from "app/store"

/**
 * Обрабатывает ошибки сети, возникающие при отправке запросов на сервер
 * @param {unknown} err - Ошибка, которая произошла при отправке запроса на сервер
 * @param {AppDispatch} dispatch - Функция dispatch из библиотеки Redux для отправки actions
 * @returns {void} - Данная функция ничего не возвращает
 */
export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = "Some error occurred"
  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`

  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))

}
