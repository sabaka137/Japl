export interface User {
    _id: string
    name: string
    role: string
    photo: string
    surname: string
    email: string
    password?: string
    country: string
    lessons: UserLesson[]
    languages: UserLanguage[]
    certificates: UserCertificate[]
    favoriteTeachers: string[]
    education: UserEducation
    inFavorite?: boolean
    description: UserDescription
    schedule: UserSchedule[]
    price: number
}
export interface TeacherReg {
    _id: string
    name: string
    role: string
    photo: string
    surname: string
    email: string
    password?: string
    country: string
    lessons: UserLesson[]
    languages: UserLanguage[]
    certificates: UserCertificate[]
    favoriteTeachers: string[]
    education: UserEducation
    inFavorite?: boolean
    description: UserDescription
    schedule: TeacherSchedule[]
    price: number
}

export type TeacherSchedule = {
    name: { full: string; short: string }
    checked: boolean
    time: { from: string; to: string }[]
}

export interface UserUpdate {
    email: string
    name: string
    password: string
    photo: string
    surname: string
}

export type UserDescription = {
    header: string
    interests: string
    experience: string
    motivation: string
}

type UserLesson = {
    teacherId: string
    studentId: string
    date: Date
}

type UserLanguage = {
    language: string
    level: string
}
type UserCertificate = {
    name: string
    issued: string
    years: { from: string; to: string }
}

type UserEducation = {
    name: string
    speciality: string
    direction: string
    diploma: string
    years: { from: string; to: string }
}

export type UserSchedule = {
    name: { full: string; short: string }
    checked: boolean
    time: { time: string; isAvailable: boolean; choosen?: boolean }[]
}
