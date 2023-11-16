import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { AuthAPI } from '../../api/services/AuthService'
import { TeachersAPI } from '../../api/services/TeachersService'

type Lesson = {
    teacherId: string
    studentId: string
    date: Date
}

type State = {
    Lesson: Lesson | null
}
const initialState: State = {
    Lesson: null,
}

const LessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        setLesson(state, action) {
            state.Lesson = action.payload
        },
    },
})

export const { setLesson } = LessonSlice.actions

export default LessonSlice.reducer
