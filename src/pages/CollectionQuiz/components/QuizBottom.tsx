import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Text } from '../../../components/Common'
import ConfirmImg from '../../../assets/images/QuizConfirm.png'
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Button = styled.div`
    padding: 20px 40px;
    background: #4255ff;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.2rem;
    margin-bottom: 30px;
    font-family: Inter;
    font-weight: 500;
`
const Image = styled.div`
    width: 250px;
    img {
        width: 250px;
    }
`

type Props = {
    setQuizMode: Dispatch<SetStateAction<'quiz' | 'results'>>
}

function QuizBottom({ setQuizMode }: Props) {
    const handleClick = () => {
        setQuizMode('results')
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <Wrapper>
            <Image>
                <img src={ConfirmImg} alt="send quiz" />
            </Image>
            <Text color="#2E3856" margin={'40px 0px'} fz={'1.7rem'}>
                It's done! Send the quiz?
            </Text>
            <Button onClick={() => handleClick()}>Submit a quiz</Button>
        </Wrapper>
    )
}

export default QuizBottom
