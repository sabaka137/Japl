export type ICollection = {
    name: string
    description: string
    id?: number
    termins: CollectionTermin[]
    isValide?: boolean
}

export type IQuizQuestion = {
    choosen: number
    correct: number
    correctMeaning: string | null
    id: number
    meaning: string | null
    termin: string | null
    type: string
    variants: string[] | []
}

export type CollectionTermin = {
    meaning: string
    reading: string
    termin: string
    id: number
    isValide?: boolean
}

export type ResultNavigationItem = {
    order: number
    isCorrect: boolean
    position: number
}
