import {createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit"
import {BaseResponse, RejectActionError} from "../common/types";
import axios from "axios";

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(isPending, (state, action) => {
            state.status = 'loading'
        })
            .addMatcher(isRejected, (state, action) => {
                state.status = 'failed'
            })
            .addMatcher(isFulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addMatcher((action): action is PayloadAction<RejectActionError> => {
                    return isRejected(action) && action.payload
                }, (state, action: PayloadAction<RejectActionError>) => {
                    if (action.payload.type === "appError") {
                        state.error = action.payload.error.messages.length ? action.payload.error.messages[0] : "Some error occurred"
                    }
                    if (action.payload.type === "catchError") {
                        if (axios.isAxiosError(action.payload)) {
                            state.error = action.payload.error.response?.data?.message || action.payload?.message || "Some error occurred"
                        } else if (action.payload instanceof Error) {
                            state.error = `Native error: ${action.payload.message}`

                        } else {
                            state.error = JSON.stringify(action.payload)
                        }
                    }
                )
                },
                selectors
    :
        {
            selectError: (state) => state.error,
                selectStatus
        :
            (state) => state.status,
                selectIsInitialized
        :
            (state) => state.isInitialized,
        }
    ,
    })

export const appReducer = slice.reducer
export const appActions = slice.actions
export const {selectError, selectStatus, selectIsInitialized} = slice.selectors
export const appPath = slice.reducerPath
export type AppInitialState = ReturnType<typeof slice.getInitialState>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
