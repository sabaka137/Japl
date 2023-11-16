import { Dispatch, SetStateAction } from 'react'
import {
    CollectionTermin,
    ICollection,
    IQuizQuestion,
} from '../types/Collections/CollectionType'

function RandomVariant(
    collection: CollectionTermin[],
    correct: CollectionTermin,
    variants: string[]
) {
    
    let filteredCollection = collection.filter(
        (termin) =>
            !variants.includes(termin.reading) &&
            termin.reading !== correct.reading
    )
    let candidate =
        filteredCollection[
            Math.floor(Math.random() * filteredCollection.length)
        ]?.reading

    return candidate
}

function RandomForTrueFalse(collection: CollectionTermin[], correct: string) {
    let filteredCollection = collection.filter(
        (termin) => termin.reading !== correct
    )
    let candidate =
        filteredCollection[
            Math.floor(Math.random() * filteredCollection.length)
        ]?.reading
    return candidate
}

function GenerateTrueFalse(
    collection: CollectionTermin[],
    quiz: IQuizQuestion[]
) {
    collection?.forEach((el, i) => {
        let temp: IQuizQuestion = {
            id: 0,
            type: 'true/false',
            termin: null,
            meaning: null,
            variants: [],
            choosen: 100,
            correct: 0,
            correctMeaning: null,
        }
        let random = Math.floor(Math.random() * 2)
        temp.id = i + 1
        temp.termin = el.termin
        temp.meaning =
            random == 1
                ? el.reading
                : RandomForTrueFalse(collection, el.reading)
        temp.correctMeaning = el.reading
        temp.variants = ['True', 'False']
        temp.correct = temp.meaning == temp.correctMeaning ? 0 : 1

        //tyta -fix 
        if(quiz.length < 4){
            quiz.push(temp)
        }else{
            if (quiz.length < collection.length / 2) {
                quiz.push(temp)
            } else {
                //закончить цикл чтобы не работал в холостую
            }
        }
        
    })
}

function GenerateOneFour(
    collection: CollectionTermin[],
    quiz: IQuizQuestion[]
) {
    collection?.forEach((el, i) => {
        let temp: IQuizQuestion = {
            id: 0,
            type: '1/4',
            termin: null,
            meaning: null,
            variants: [],
            choosen: 100,
            correct: 0,
            correctMeaning: null,
        }
        temp.termin = el.termin
        temp.correctMeaning = el.meaning
        temp.meaning = el.meaning
        temp.id = i + 1

        let pos = Math.floor(Math.random() * 4) // random correct answer position
        temp.correct = pos

        for (let j = 0; j < 4; j++) {
            if (j == pos) {
                temp.variants[j] = '1'
            } else {
                temp.variants[j] = '0'
            }
        }

        temp.variants.map((el1, index) => {
            if (el1 === '0') {
                temp.variants[index] = RandomVariant(
                    collection,
                    el,
                    temp.variants
                )
            } else {
                temp.variants[index] = el.reading
            }
        })
        
        if(quiz.length > 3){
          
            if (i + 1 > quiz.length && quiz.length < collection.length) {
                quiz.push(temp)
            } else {
                //прервать цикл
            }
        }
    })
}
function Shuffle(array: CollectionTermin[]) {
    let shuffledArray = [...array]

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ]
    }
    return shuffledArray
}

export function createQuiz(collection: ICollection, setFinish: Dispatch<SetStateAction<boolean>>):IQuizQuestion[] {
    let ShuffledArray = Shuffle(collection.termins) // change the order of terms so that the quiz is not in the same order
    const quiz: IQuizQuestion | [] = []
    GenerateTrueFalse(ShuffledArray, quiz)
    GenerateOneFour(ShuffledArray, quiz)
    console.log(quiz)
    setFinish(true)
    return quiz
}
