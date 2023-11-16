import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { useParams } from 'react-router-dom'

import { CollectionSliceAsyncActions } from '../../redux/reducers/CollectionSlice'
import { createQuiz } from '../../utils/CreateQuiz'
import {
    IQuizQuestion,
    ResultNavigationItem,
} from '../../types/Collections/CollectionType'

import {
    Container,
    ContentContainer,
    PageWrapper,
} from '../../components/Common'
import { QuizResults } from './components/QuizResults'
import QuizTest from './components/QuizTest'
import { QuizNavigation } from './components/QuizNavigation'
import QuizBottom from './components/QuizBottom'
import { ChangeTitle } from '../../utils/ChangeTitle'

function CollectionQuiz() {
    const [quizMode, setQuizMode] = useState<'quiz' | 'results'>('quiz')
    const [quiz, setQuiz] = useState<IQuizQuestion[] | []>([])
    const [quizFinish, setFinish] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)
    const [ResultNav, setResultNav] = useState<ResultNavigationItem[] | []>([])

    const { id } = useParams()
    const dispatch = useAppDispatch()

    const currentCollection = useAppSelector(
        (state) => state.collections.currentCollection
    )
    const isLoading = useAppSelector((state) => state.collections.isLoading)

    let QuizRefs = useRef<HTMLDivElement[]>([])
    const addQuizToRef = (el: HTMLDivElement) => {
        if (el && !QuizRefs.current.includes(el)) {
            QuizRefs.current.push(el)
        }
    }

    useEffect(() => {
        ChangeTitle('Japl | Quiz')
        if (!currentCollection) {
            dispatch(CollectionSliceAsyncActions.GetCollection(id!))
        } else if (quiz.length === 0) {
            setQuiz(createQuiz(currentCollection, setFinish))
        }
    }, [isLoading, quizMode])

    useEffect(() => {
        if (quizMode === 'results') {
            let TotalCorrect: number = 0
            quiz.forEach((el) => el.choosen === el.correct && TotalCorrect++)

            let tempResult: ResultNavigationItem[] = []
            quiz.forEach((el, index) =>
                tempResult.push({
                    order: index + 1,
                    isCorrect: el.choosen === el.correct,
                    position:
                        QuizRefs.current[index].getBoundingClientRect().top -
                        document.body.getBoundingClientRect().top -
                        100,
                })
            )

            setResultNav(tempResult)
            setCorrectAnswers(TotalCorrect)
        }
    }, [quizMode])

    function setChoosenVariant(index: number, id: number) {
        let updatedArray = quiz.map((question) =>
            question.id === id
                ? {
                      ...question,
                      choosen: index,
                  }
                : { ...question }
        )
        setQuiz(updatedArray)
    }

    function Restart() {
        QuizRefs.current = []
        setResultNav([])
        setQuiz([])
        setQuizMode('quiz')
        setFinish(false)
    }
    return (
        <PageWrapper h={window.innerHeight}>
            <ContentContainer>
                <Container>
                    {!isLoading && quizFinish && (
                        <>
                            <QuizNavigation
                                quizMode={quizMode}
                                ResultNav={ResultNav}
                            />
                            <QuizResults
                                correct={correctAnswers}
                                quizMode={quizMode}
                                restart={Restart}
                                total={quiz.length}
                            />
                            <QuizTest
                                quiz={quiz}
                                addQuizToRef={addQuizToRef}
                                QuizRefs={QuizRefs}
                                setChoosenVariant={setChoosenVariant}
                                quizMode={quizMode}
                            />
                            {quizMode === 'quiz' && (
                                <QuizBottom setQuizMode={setQuizMode} />
                            )}
                        </>
                    )}
                </Container>
            </ContentContainer>
        </PageWrapper>
    )
}

export default CollectionQuiz
