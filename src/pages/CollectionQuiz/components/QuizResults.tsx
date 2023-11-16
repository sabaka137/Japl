import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { StatsDiagram } from './StatsDiagram'
import { NavLink, useParams } from 'react-router-dom'

import { Text } from '../../../components/Common'

import RestartImg from '../../../assets/images/QuizRestart.png'
import RedirectImg from '../../../assets/images/ToFlashcard.png'

const Container = styled.div`
    width: 55%;
    margin: 0 auto;
    @media (max-width: 1028px) {
        width: 70%;
    }
    @media (max-width: 778px) {
        width: 100%;
    }
`

const PracticeContainer = styled.div`
    width: 50%;
    box-sizing: border-box;
    @media (max-width: 1600px) {
        display: block;
        gap: 30px;
        width: 100%;
    }
`
//fix-type
const PracticeItem = styled(NavLink)<any>`
    background: white;
    text-decoration: none;
    padding: 10px 20px;
    box-shadow: 0 0.25rem 1rem #2e385614;
    border: 0.125rem solid #f6f7fb;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #4255ff;
    border-radius: 5px;
    margin-bottom: 20px;
    svg {
        width: 100px;
        height: 100px;
    }
    &:hover{
        box-shadow: 0 0.65rem 1rem #2e385614;
    }
    @media (max-width: 1600px) {
        width: 100%;
        padding: 30px 20px;
        svg {
            width: 60px;
            height: 60px;
        }
    }
`
export const PracticeItemText = styled.div`
    color: #4255ff;
    font-size: 1.2rem;
    font-weight: bold;
`
export const PracticeItemDesc = styled.div`
    line-height: 1.1rem;
    font-size: 0.9rem;
    margin-top: 10px;
    text-decoration: none;
    color: #2e3856;
`

export const Test = styled.div`
    display: flex;
    gap: 20px;
    @media (max-width: 1600px) {
        flex-direction: column;
        align-items: center;
        justufy-content: center;
    }
`
export const Image = styled.div`
    width: 60px;
    height: auto;
    img {
        width: 60px;
        height: auto;
    }
`

type Props = {
    correct: number
    total: number
    restart: () => void
    quizMode: string
}
type Phrase = {
    0: string
    25: string
    50: string
    75: string
    100: string
}
export const QuizResults = ({ correct, total, restart, quizMode }: Props) => {
    const { id } = useParams()
    //fix-type
    const [Phrases] = useState<any>({
        0: "Don't give up, you'll make it.",
        25: "Don't give up! You're on the right track",
        50: 'Great result!',
        75: 'You are making great progress, keep it up!',
        100: "You're unbelievable.",
    })
    function PickPhrase() {
        let percent = Math.floor((correct * 100) / total)
        for (let i = 0; i < Object.keys(Phrases).length; i++) {
            if (percent === 100) {
                return Phrases[100]
            }
            if (
                percent >= Number(Object.keys(Phrases)[i]) &&
                percent <= Number(Object.keys(Phrases)[i + 1])
            ) {
                return Phrases[Object.keys(Phrases)[i]]
            }
        }
    }
    return (
        <>
            {quizMode === 'results' && (
                <Container>
                    <Text color="#2E3856" fz={'1.9rem'} margin={'0px 0px 15px'}>
                        {PickPhrase()}
                    </Text>
                    <Test>
                        <StatsDiagram correct={correct} total={total} />
                        <PracticeContainer>
                            <PracticeItem to={`/group/${id}`}>
                                <Image>
                                    <img src={RestartImg} />
                                </Image>
                                <div>
                                    <PracticeItemText>
                                        Practice the terms in memorization mode
                                    </PracticeItemText>
                                    <PracticeItemDesc>
                                        Keep practicing the missing terms until
                                        you learn them.
                                    </PracticeItemDesc>
                                </div>
                            </PracticeItem>
                            <PracticeItem onClick={() => restart()}>
                                <Image>
                                    <img src={RedirectImg} />
                                </Image>
                                <div>
                                    <PracticeItemText>
                                        Take the new quiz
                                    </PracticeItemText>
                                    <PracticeItemDesc>
                                        Take another test to become even more
                                        more confident in your knowledge.
                                    </PracticeItemDesc>
                                </div>
                            </PracticeItem>
                        </PracticeContainer>
                    </Test>
                    <Text
                        color="#939bb4"
                        margin={'0px 0px 30px'}
                        fz={'1.5rem'}
                        fw={'bold'}
                    >
                        Your answers
                    </Text>
                </Container>
            )}
        </>
    )
}
