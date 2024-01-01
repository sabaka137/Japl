export interface IFilter {
    languages: {
        id: number
        language: { label: string; code: string }
        checked: boolean
    }[]
    price: { min: number; max: number }
    countries: {
        id: number
        country: { label: string; code: string }
        checked: boolean
    }[]
    time: string[]
    days: string[]
    currentPage?: number
    isNative: boolean
    sortBy: { value: string; label: string }
    searchBy: string
}

export interface FilterRequestOptions {
    languages: string | null
    minPrice: number
    page: number
    maxPrice: number
    countries: string | null
    time: string | null
    days: string | null
    isNative: boolean
    sort: string | null
    search: string | null
}

export interface ScheduleStats {
    morning: number
    day: number
    evening: number
    night: number
}
