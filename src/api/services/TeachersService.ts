import API from '..'
import { FilterRequestOptions } from '../../types/Teachers/TeachersType'
export const TeachersAPI = {
    GetTeachers(filters: FilterRequestOptions) {
        return API.get(
            `users/getTeachers?countries=${filters.countries}&page=${filters.page}&language=${filters.languages}&min=${filters.minPrice}&max=${filters.maxPrice}&search=${filters.search}&sort=${filters.sort}&native=${filters.isNative}&time=12:30,13:00,14&days=Mon`
        )
    },
    GetTeacher(id: string) {
        return API.get(`users/getTeacher?id=${id}`)
    },
    GetLessons() {
        return API.get('users/getLessons')
    },

    RefreshData() {
        return API.get('users/refreshData')
    },
}
