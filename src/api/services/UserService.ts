import API from '..'
import { Lesson } from '../../types/Lesson/LessonsType'
import { UserUpdate } from '../../types/User/UserTypes'

export const UserAPI = {
    GetTeachers() {
        return API.get('users/getTeachers')
    },
    GetFavoriteTeachers() {
        return API.get('users/getFavoriteTeachers')
    },
    GetLessons() {
        return API.get('users/getLessons')
    },
    SetLessons(data: Lesson) {
        return API.post('users/setLessons', data)
    },
    RefreshData() {
        return API.get('users/refreshData')
    },
    GetUser() {
        return API.get('users/getUser')
    },
    Subscribe() {
        return API.get('users/subcribeNotifications')
    },
    UpdateUser(data: UserUpdate) {
        return API.post('users/updateUser', data)
    },
    AddToFavorite(teacherId: string) {
        return API.post('users/addToFavorite', { teacherId })
    },
    RemoveFromFavorite(teacherId: string) {
        return API.post('users/removeFromFavorite', { teacherId })
    },
}
