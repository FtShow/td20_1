import {handleServerNetworkError} from "common/utils/handle-server-network-error"

import {appActions} from "app/appSlice"

export const thunkTryCatch = async <T>(
//  thunkAPI: any,
thunkAPI: any,
// thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>,
logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const {rejectWithValue, dispatch} = thunkAPI
    // dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
        return await logic()
    } catch (e) {

        return rejectWithValue(e)
    }
}
