import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TeachersAPI } from '../../api/services/TeachersService'
import { User } from '../../types/User/UserTypes'
import { RootState } from '../store/store'
import {
    FilterRequestOptions,
    IFilter,
} from '../../types/Teachers/TeachersType'

export const GetTeachersList = createAsyncThunk<
    any,
    FilterRequestOptions,
    { state: RootState }
>('teachers/GetTeachersList', async (filters, { getState }) => {
    try {
        const response = await TeachersAPI.GetTeachers(filters)
        const isAuthenticated = getState().user.User !== null
        const UserFavorites = getState().user.User?.favoriteTeachers
        return { data: response.data, UserFavorites, isAuthenticated }
    } catch (e) {
        console.log(e)
    }
})
export const GetTeacher = createAsyncThunk<any, any, { state: RootState }>(
    'teachers/GetTeacher',
    async (id: string, { getState }) => {
        try {
            const response = await TeachersAPI.GetTeacher(id)
            const isAuthenticated = getState().user.User !== null
            const UserFavorites = getState().user.User?.favoriteTeachers
            return { data: response.data, UserFavorites, isAuthenticated }
        } catch (e) {
            console.log(e)
        }
    }
)

type GroupState = {
    teachersList: User[] | null
    teachersTotal: number
    pagesTotal: number
    currentTeacher: User | null
    isLoad: boolean
    isTeacheLoad: boolean
}
const initialState: GroupState = {
    teachersList: null,
    currentTeacher: null,
    teachersTotal: 0,
    pagesTotal: 0,
    isLoad: false,
    isTeacheLoad: false,
}
const TeachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        setModalOpen(state, action) {
            state.teachersList = state.teachersList!.map((el) =>
                el._id === action.payload
                    ? { ...el, isModalOpen: true }
                    : { ...el }
            )
        },
        setModalClose(state, action) {
            state.teachersList = state.teachersList!.map((el) => ({
                ...el,
                isModalOpen: false,
            }))
        },
        setFavorite(state, action) {
            if (state.teachersList !== null) {
                state.teachersList = state.teachersList!.map((teacher: User) =>
                    teacher._id === action.payload
                        ? { ...teacher, inFavorite: true }
                        : { ...teacher }
                )
            } else {
                state.currentTeacher = {
                    ...state.currentTeacher!,
                    inFavorite: true,
                }
            }
        },
        unSetFavotite(state, action) {
            if (state.teachersList !== null) {
                state.teachersList = state.teachersList!.map((teacher: User) =>
                    teacher._id === action.payload
                        ? { ...teacher, inFavorite: false }
                        : { ...teacher }
                )
            } else {
                state.currentTeacher = {
                    ...state.currentTeacher!,
                    inFavorite: false,
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetTeachersList.pending, (state, action) => {
                state.isLoad = false
            })
            .addCase(GetTeachersList.fulfilled, (state, action) => {
                state.teachersList = action.payload?.data.teachers.map(
                    (el: any) => ({
                        ...el,
                        isModalOpen: false,
                        inFavorite: action.payload.isAuthenticated
                            ? action.payload.UserFavorites.includes(el._id)
                            : false,
                    })
                )
                state.teachersTotal = action.payload.data.teachersTotal
                state.pagesTotal = action.payload.data.totalPages
                state.isLoad = true
            })
            .addCase(GetTeacher.pending, (state, action) => {
                state.isTeacheLoad = false
            })
            .addCase(GetTeacher.fulfilled, (state, action) => {
                state.currentTeacher = {
                    ...action.payload.data,
                    inFavorite: action.payload.isAuthenticated
                        ? action.payload.UserFavorites.includes(
                              action.payload.data._id
                          )
                        : false,
                }
                state.isTeacheLoad = true
            })
    },
})

export const { setModalClose, setModalOpen, setFavorite, unSetFavotite } =
    TeachersSlice.actions

export default TeachersSlice.reducer
