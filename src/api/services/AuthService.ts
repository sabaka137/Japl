import API from '..'
import { User } from '../../types/User/UserTypes'

type LoginData = {
    email: string
    password: string
}

type UserRegestration = {
    email: string
    password: string
}

export const AuthAPI = {
    Login(data: LoginData) {
        console.log(data.email)
        return API.post('auth/login', {
            email: data.email,
            password: data.password,
        })
    },
    registration(data: UserRegestration | User) {
        return API.post(`auth/registration`, {
            ...data,
        })
    },
}
