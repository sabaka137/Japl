import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TeachersAPI } from '../../api/services/TeachersService'
import { UserAPI } from '../../api/services/UserService'
import { User, UserUpdate } from '../../types/User/UserTypes'
import { MessageAPI } from '../../api/services/MessageService'
import { setFavorite, unSetFavotite } from './TeachersSlice'
import { Lesson } from '../../types/Lesson/LessonsType'
import { RootState } from '../store/store'

export const GetTeachersList = createAsyncThunk(
    'teachers/GetTeachersList',
    async () => {
        try {
            const response = await TeachersAPI.GetTeachers()
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)
export const GetUser = createAsyncThunk(
    'teachers/GetUser',
    async (_, { dispatch }) => {
        try {
            const response = await UserAPI.GetUser()
            return response.data
        } catch (e) {
            console.error(e)
        }
    }
)
export const GetConversations = createAsyncThunk(
    'teachers/GetConversations',
    async (id: string) => {
        try {
            const response = await MessageAPI.getConversations(id)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)
export const GetConversationFriend = createAsyncThunk(
    'teachers/GetConversationFriend',
    async (id: string) => {
        try {
            const response = await MessageAPI.getConversationFriend(id)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)
export const GetMessages = createAsyncThunk(
    'teachers/GetMessages',
    async (id: string) => {
        try {
            const response = await MessageAPI.getMessages(id)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)
export const Subscribe = createAsyncThunk(
    'teachers/Subscribe',
    async (_, { dispatch }) => {
        try {
            await UserAPI.Subscribe().then((res) => {
                dispatch(setNotifications(res.data))
                dispatch(Subscribe())
            })
        } catch (e) {
            setTimeout(() => {
                Subscribe()
            }, 500)
        }
    }
)
export const UpdateUser = createAsyncThunk(
    'user/Update',
    async (data: UserUpdate, { dispatch }) => {
        try {
            await UserAPI.UpdateUser(data)
        } catch (e) {}
    }
)
export const AddToFavorite = createAsyncThunk(
    'teachers/AddToFavorite',
    async (teacherId: string, { dispatch }) => {
        try {
            await UserAPI.AddToFavorite(teacherId)
            dispatch(setFavorite(teacherId))
            dispatch(setFavoriteLocal(teacherId))
        } catch (e) {
            console.error(e)
        }
    }
)
export const RemoveFromFavorite = createAsyncThunk(
    'teachers/RemoveFromFavorite',
    async (teacherId: string, { dispatch }) => {
        try {
            await UserAPI.RemoveFromFavorite(teacherId)
            dispatch(unSetFavotite(teacherId))
            dispatch(unsetFavoriteLocal(teacherId))
        } catch (e) {
            console.error(e)
        }
    }
)
export const GetFavoriteTeachers = createAsyncThunk<
any,
any,
{ state: RootState }
>(
    'teachers/GetFavoriteTeachers',
    async (id:string,{getState}) => {
        try {
            const response = await UserAPI.GetFavoriteTeachers()
            const isAuthenticated = getState().user.User !== null
            const UserFavorites = getState().user.User?.favoriteTeachers
            return { data: response.data, UserFavorites, isAuthenticated }
        } catch (e) {
            console.error(e)
        }
    }
)
export const GetLessons = createAsyncThunk('auth/getLessons', async () => {
    try {
        const response = await TeachersAPI.GetLessons()

        return response.data
    } catch (e) {
        console.log(e)
    }
})
export const SetLessons = createAsyncThunk(
    'auth/getLessons',
    async (data: Lesson) => {
        try {
            await UserAPI.SetLessons(data)
        } catch (e) {
            console.log(e)
        }
    }
)
type GroupState = {
    lessons: any[] | null | undefined
    favoriteTeachers: User[] | []
    favoriteTeachersStatus: 'pending' | 'done' | 'rejected'
    User: User | null
    Conversations: any
    isConversationLoad:boolean
    Notifications: any
    isLoad: boolean
}
const initialState: GroupState = {
    lessons: null,
    User: null,
    favoriteTeachers: [],
    isConversationLoad:false,
    favoriteTeachersStatus: 'pending',
    Conversations: null,
    Notifications: [],
    isLoad: false,
}
const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setNotifications(state, action) {
            state.Notifications = action.payload
        },

        setUser(state, action) {
            state.User = action.payload
        },
        setFavoriteLocal(state, action) {
            state.User!.favoriteTeachers.push(action.payload)
            state.favoriteTeachers = state.favoriteTeachers.map((teacher: User) =>
            teacher._id === action.payload
                ? { ...teacher, inFavorite: true }
                : { ...teacher }
        )
        },
        unsetFavoriteLocal(state, action) {
            state.favoriteTeachers = state.favoriteTeachers.map((teacher: User) =>
            teacher._id === action.payload
                ? { ...teacher, inFavorite: false }
                : { ...teacher }
        )
            state.User!.favoriteTeachers = state.User!.favoriteTeachers.filter(id => id !== action.payload )
        },
        ClearUser(state) {
            state.User = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUser.pending, (state, action) => {
                state.isLoad = false
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.User = action.payload
                state.isLoad = true
            })
            .addCase(GetConversations.pending, (state, action) => {
                state.isConversationLoad = false
            })
            .addCase(GetConversations.fulfilled, (state, action) => {
                state.Conversations = action.payload
                state.isConversationLoad = true
            })
            .addCase(GetFavoriteTeachers.pending, (state, action) => {
                state.favoriteTeachersStatus = 'pending'
            })
            .addCase(GetFavoriteTeachers.fulfilled, (state, action) => {
                state.favoriteTeachers = action.payload?.data.map((el: any) => ({
                    ...el,
                    isModalOpen: false,
                    inFavorite: action.payload.isAuthenticated
                        ? action.payload.UserFavorites.includes(el._id)
                        : false,
                }))
                state.favoriteTeachersStatus = 'done'
            })
    },
})

export const { setNotifications, setUser, ClearUser,setFavoriteLocal,unsetFavoriteLocal} = UserSlice.actions

export default UserSlice.reducer
