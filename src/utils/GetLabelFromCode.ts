import { REGISTRATION_LANGUAGE } from "../constants/data"

export const getLabel=(code:string)=>{
    return REGISTRATION_LANGUAGE.filter(language => language.value === code)[0]?.label || 'English'
}