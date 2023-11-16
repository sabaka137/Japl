import { configureStore } from '@reduxjs/toolkit'
import VocabularySlice from '../reducers/VocabularySlice'
import CollectionSlice from '../reducers/CollectionSlice'
import SearchSlice from '../reducers/SearchSlice'
import TeachersSlice from '../reducers/TeachersSlice'
import UserSlice from '../reducers/UserSlice'
import LessonSlice from '../reducers/LessonSlice'

const store = configureStore({
    reducer: {
        vocabulary: VocabularySlice,
        collections: CollectionSlice,
        search: SearchSlice,
        teachers: TeachersSlice,
        user: UserSlice,
        lesson: LessonSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
