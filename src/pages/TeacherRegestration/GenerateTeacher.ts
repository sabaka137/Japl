import { POSSIBLE_TIME_RANGE } from '../../constants/Time'
import { COUNTRIES, LANGUAGE_LEVEL } from '../../constants/data'
import { DESC, NAMES } from './DATA'
import { FACES } from './faces'
export function generateSchedule() {
    const Temp: any = [
        {
            name: { full: 'Monday', short: 'Mon' },
            checked: true,
            time: [],
        },
        {
            name: { full: 'Tuesday', short: 'Tue' },
            checked: true,
            time: [],
        },
        {
            name: { full: 'Wednesday', short: 'Wed' },
            checked: true,
            time: [],
        },
        {
            name: { full: 'Thursday', short: 'Thu' },
            checked: true,
            time: [],
        },
        {
            name: { full: 'Friday', short: 'Fri' },
            checked: true,
            time: [],
        },
        {
            name: { full: 'Saturday', short: 'Sat' },
            checked: true,
            time: [],
        },
        {
            name: { full: 'Sunday', short: 'Sun' },
            checked: true,
            time: [],
        },
    ]
    for (let i = 0; i < 7; i++) {
        const firstPoint = Math.floor(
            Math.random() * (POSSIBLE_TIME_RANGE.length - 1) + 1
        )
        const secondPoint = Math.floor(
            Math.random() * (POSSIBLE_TIME_RANGE.length - firstPoint + 5) +
                firstPoint +
                5
        )

        POSSIBLE_TIME_RANGE.slice(firstPoint, secondPoint).forEach((el) => {
            Temp[i].time.push({ time: el, isAvailable: true })
        })
    }
    return Temp
}
export function generate(photo: string) {
    const teacher = {
        role: 'teacher',
        password: '123123',
        name: '',
        email: '',
        photo: '',
        surname: '',
        country: '',
        languages: [
            {
                language: '',
                level: '',
            },
        ],
        certificates: [
            {
                name: '',

                issued: '',
                years: {
                    from: '',
                    to: '',
                },
            },
        ],
        education: {
            name: '',
            speciality: '',
            diploma: '',
            direction: '',
            years: {
                from: '',
                to: '',
            },
        },
        description: {
            header: '',
            interests: '',
            experience: '',
            motivation: '',
        },
        schedule: generateSchedule(),
        price: 0,
    }

    const country =
        COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].country.code
    const currentName = NAMES[Math.floor(Math.random() * NAMES.length)].name
    const currentSurname =
        NAMES[Math.floor(Math.random() * NAMES.length)].surname
    const interests = DESC[
        Math.floor(Math.random() * DESC.length)
    ].interests.replace('NAME', currentName)

    teacher.photo = photo
    teacher.country = country
    teacher.email = `${currentName}${Math.floor(Math.random() * 4241)}`
    teacher.languages = [
        {
            language: country,
            level: 'Native',
        },
        {
            language:
                COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].country
                    .code,
            level: LANGUAGE_LEVEL[
                Math.floor(Math.random() * LANGUAGE_LEVEL.length)
            ].value,
        },
        {
            language:
                COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].country
                    .code,
            level: LANGUAGE_LEVEL[
                Math.floor(Math.random() * LANGUAGE_LEVEL.length)
            ].value,
        },
    ]
    teacher.name = currentName
    teacher.surname = currentSurname
    teacher.price = Math.floor(Math.random() * (50 - 10)) + 10

    teacher.description = {
        interests,
        experience: DESC[Math.floor(Math.random() * DESC.length)].experience,
        motivation: DESC[Math.floor(Math.random() * DESC.length)].motivation,
        header: DESC[Math.floor(Math.random() * DESC.length)].header,
    }
    return teacher
}
