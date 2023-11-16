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
    isNative: boolean
    sortBy: { value: string; label: string }
    searchBy: string
}

export interface FilterRequestOptions {
    languages: string | null
    minPrice:number,
    maxPrice:number,
    countries: string | null
    time: string | null
    days: string | null
    isNative: boolean
    sortBy: string | null
    searchBy: string | null
}
