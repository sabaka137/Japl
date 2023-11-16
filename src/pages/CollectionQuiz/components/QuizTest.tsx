import {
    QuestionOrder,
    QuestionValue,
    QuizCard,
    QuizQuestion,
    QuizSide,
    QuizVariants,
    ResultCorrectAnswer,
    SideValue,
    Variant,
} from '../style'
import { IoClose } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'
import { Flex, Text } from '../../../components/Common'
import { IQuizQuestion } from '../../../types/Collections/CollectionType'

//fix-type
type Props = {
    quiz: IQuizQuestion[]
    addQuizToRef: (e: HTMLDivElement) => void
    QuizRefs: React.MutableRefObject<HTMLDivElement[]>
    quizMode: string
    setChoosenVariant: (index: number, id: number) => void
}
export const QuizTest = ({
    quiz,
    addQuizToRef,
    QuizRefs,
    quizMode,
    setChoosenVariant,
}: Props) => {
    function VarianClick(
        index: number,
        questionId: number,
        questionIndex: number
    ) {
        if (quizMode === 'results') {
            return
        }
        setChoosenVariant(index, questionId)
        if (questionIndex + 1 < quiz.length) {
            window.scrollTo({
                top:
                    QuizRefs.current[questionIndex + 1].getBoundingClientRect()
                        .top -
                    document.body.getBoundingClientRect().top -
                    100,
                behavior: 'smooth',
            })
        }
    }
    //fix - мб как-то получше можно сделать, мне не нравится короче
    function PickBorder(
        choosen: number,
        currentVariant: number,
        correct: number,
        questionType: string
    ) {
        if (quizMode === 'results') {
            if (choosen === currentVariant) {
                //вариант который выбрал пользователь
                if (choosen === correct) {
                    //вариант который выбрал пользователь верный
                    //prev 2px solid #c7f7e6
                    return '2px solid #59e8b5'
                } else {
                    //вариант который выбрал пользователь неверный
                    //prev 2px solid #9d0828
                    return '2px solid #ff7873'
                }
            } else {
                //вариант который не выбрали
                if (questionType === '1/4') {
                    /**
                     * Если в задании типа 1/4 пользовательн выбрал неправильный вариант
                     * то правильный вариант подсветится зеленым, в ином случае обычной обводнкой
                     */
                    if (choosen !== correct) {
                        if (currentVariant === correct) {
                            return '2px solid #59e8b5'
                        } else {
                            return '1px solid black'
                        }
                    } else {
                        return '1px solid black'
                    }
                } else {
                    // дефолтная обводка
                    return '1px solid black'
                }
            }
        }
        if (quizMode === 'quiz') {
            if (choosen === currentVariant) {
                return '1px solid #4255ff'
            } else {
                return '1px solid #586380'
            }
        }
    }
    function PickBackground(
        choosen: number,
        currentVariant: number,
        correct: number,
        questionType: string
    ) {
        if (quizMode === 'results') {
            if (currentVariant === choosen) {
                // Вариант выбрали
                if (choosen === correct) {
                    //вариант который выбрал пользователь верный
                    //prev #18ae79
                    return '#e6fcf4'
                } else {
                    //вариант который выбрал пользователь неверный
                    return 'transparent'
                }
            } else {
                //Вариант не выбрали
                if (questionType === '1/4') {
                    /**
                     * Если в задании типа 1/4 пользовательн выбрал неправильный вариант
                     * то правильный вариант подсветится зеленым, в ином случае обычной обводнкой
                     */
                    if (choosen !== correct) {
                        if (currentVariant === correct) {
                            return '#e6fcf4'
                        } else {
                            return 'transparent'
                        }
                    }
                }
            }
        } else {
            // дефолтный фон для кнопки
            //prev #282e3e
            return currentVariant === choosen && '#edefff'
        }
    }
    function PickOpacity(
        choosen: number,
        currentVariant: number,
        correct: number,
        questionType: string
    ) {
        if (quizMode === 'results') {
            if (currentVariant === choosen) {
                return '1'
            } else {
                //Вариант не выбрали
                if (questionType === '1/4') {
                    /**
                     * Если в задании типа 1/4 пользовательн выбрал неправильный вариант
                     * то правильный вариант подсветится зеленым, в ином случае обычной обводнкой
                     */
                    if (choosen !== correct) {
                        if (currentVariant === correct) {
                            return '1'
                        } else {
                            return '0.4'
                        }
                    }
                }
                return '0.4'
            }
        } else {
            // дефолтный фон для кнопки
            return '1'
        }
    }
    return (
        <>
            {quiz?.map((question, questionIndex: number) => (
                <QuizCard key={questionIndex} ref={addQuizToRef}>
                    <QuizQuestion>
                        {question.type == 'true/false' ? (
                            <>
                                <QuizSide>
                                    <Flex align="center">
                                        <SideValue>Termin</SideValue>
                                        <QuestionOrder>
                                            {questionIndex + 1} из {quiz.length}
                                        </QuestionOrder>
                                    </Flex>
                                    <QuestionValue>
                                        {question.termin}
                                    </QuestionValue>
                                </QuizSide>

                                <QuizSide>
                                    <SideValue>Meaning</SideValue>
                                    <QuestionValue>
                                        {question.meaning}
                                    </QuestionValue>
                                </QuizSide>
                            </>
                        ) : (
                            <div>
                                <SideValue>Meaning</SideValue>
                                <QuestionValue>{question.termin}</QuestionValue>
                            </div>
                        )}
                    </QuizQuestion>

                    <QuizVariants>
                        {question.variants.map((variant, index) => (
                            <Variant
                                key={index}
                                borderStyle={PickBorder(
                                    question.choosen,
                                    index,
                                    question.correct,
                                    question.type
                                )}
                                BGStyle={PickBackground(
                                    question.choosen,
                                    index,
                                    question.correct,
                                    question.type
                                )}
                                OpacityStyle={PickOpacity(
                                    question.choosen,
                                    index,
                                    question.correct,
                                    question.type
                                )}
                                mode={quizMode}
                                onClick={() =>
                                    VarianClick(
                                        index,
                                        question.id,
                                        questionIndex
                                    )
                                }
                            >
                                {quizMode === 'results' &&
                                    question.choosen === index &&
                                    (question.correct === question.choosen ? (
                                        <BsCheckLg color="#a2f2d5" />
                                    ) : (
                                        <IoClose color="#ff7873" />
                                    ))}
                                <Text fz={'1.1rem'}>{variant}</Text>
                            </Variant>
                        ))}
                    </QuizVariants>
                    {quizMode == 'results' &&
                        question.variants[question.correct] === 'false' && (
                            <ResultCorrectAnswer>
                                <BsCheckLg />
                                {question.correctMeaning}
                            </ResultCorrectAnswer>
                        )}
                </QuizCard>
            ))}
        </>
    )
}

export default QuizTest
