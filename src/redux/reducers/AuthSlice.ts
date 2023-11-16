import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthAPI } from '../../api/services/AuthService'
import { TeachersAPI } from '../../api/services/TeachersService'
import { ClearUser, GetUser } from './UserSlice'

type LoginData = {
    email: string
    password: string
}
export const AuthSliceAsyncActions = {
    Login: createAsyncThunk(
        'auth/Login',
        async (data: LoginData, { dispatch }) => {
            try {
                const response = await AuthAPI.Login(data)
                localStorage.setItem('token', response.data.token)
                dispatch(GetUser())
                return response.request.status
            } catch (e: any) {
                return e.request.status
            }
        }
    ),
    LogOut: createAsyncThunk('auth/LogOut', async (_, { dispatch }) => {
        try {
            localStorage.removeItem('token')
            dispatch(ClearUser())
        } catch (e) {
            return e
        }
    }),
    //fix-type
    Registration: createAsyncThunk(
        'auth/Registration',
        async (data: any, { dispatch }) => {
            try {
                const response = await AuthAPI.registration(data)
                localStorage.setItem('token', response.data.token)
                dispatch(GetUser())
            } catch (e) {
                console.log(e)
            }
        }
    ),
}

export const RefreshData = createAsyncThunk('auth/refresh', async () => {
    try {
        const response = await TeachersAPI.RefreshData()
        return response.data
    } catch (e) {
        console.log(e)
    }
})
const AuthSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AuthSliceAsyncActions.Login.pending, (state, action) => {})
            .addCase(
                AuthSliceAsyncActions.Login.fulfilled,
                (state, action) => {}
            )
    },
})

export default AuthSlice.reducer
