type FieldErrorType = {
  error: string
  field: string
}

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors: FieldErrorType[]
}

export type ActionForTests<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type RejectAppError = {
  error: BaseResponse
  type: "appError"
}
export type RejectCatchError = {
  error: unknown
  type: "catchError"
}
export type RejectActionError = RejectCatchError | RejectAppError