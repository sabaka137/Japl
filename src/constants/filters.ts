import { COUNTRIES, LANGUAGES } from './data'

export const DEFAULT_FILTERS = {
    languages: LANGUAGES,
    price: { min: 1, max: 35 },
    countries: COUNTRIES,
    time: [],
    days: [],
    isNative: false,
    sortBy: { label: 'Our recommendations', value: '' },
    currentPage: 1,
    searchBy: '',
}
