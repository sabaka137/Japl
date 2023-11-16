import React, { FC } from 'react'
import styled from 'styled-components'
import { Flex } from '../../../components/Common'
import { MdKeyboardArrowRight } from 'react-icons/md'
const Wrapper = styled.div`
    width: 100%;
    height: 50px;
    background: #384047;
    display: flex;
    align-items: center;
`
const Container = styled.div`
    min-width: 65%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;

    @media (min-width: 1500px) {
        justify-content: space-between;
    }
`
const Step = styled.div<{
    active: boolean
    completed: boolean
    stepNumber: number
}>`
    display: flex;
    align-items: center;
    color: ${(props) =>
        props.active ? 'white' : props.completed ? 'white' : '#828d95'};
    font-family: Inter;
    svg {
        font-size: 1.8rem;
        line-height: 2rem;
        margin: 0px 10px;
        @media (max-width: 1250px) {
            margin-left: 0px;
        }
        @media (max-width: 650px) {
            display: none;
        }
    }
    div {
        @media (max-width: 1250px) {
            display: none;
        }
    }

    &:hover {
        cursor: pointer;
    }
    &:before {
        content: '${(props) =>
            props.completed ? '\\2713' : props.stepNumber}';
        display: flex;
        color: ${(props) =>
            props.active ? '#828d95' : props.completed ? 'white' : '#828d95'};
        margin-right: 8px;
        justify-content: center;
        align-items: center;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        border: ${(props) =>
            props.active
                ? 'none'
                : props.completed
                ? 'none'
                : '1px solid #828d95'};
        background: ${(props) =>
            props.active
                ? 'white'
                : props.completed
                ? '#50bf16'
                : '"transparent"'};
        @media (max-width: 1250px) {
            margin-left: 0px;
        }
    }
`

const Steps = [
    { number: 1, name: 'General' },
    { number: 2, name: 'Photo' },
    { number: 3, name: 'Certification' },
    { number: 4, name: 'Education' },
    { number: 5, name: 'Description' },
    { number: 6, name: 'Schedule' },
    { number: 7, name: 'Pricing' },
]
//fix-type
type Props = {
    currentStep: number
}
export const StepNavigation = ({ currentStep }: Props) => {
    return (
        <Wrapper>
            <Container>
                {Steps.map((step, index) => (
                    <Step
                        key={step.number}
                        stepNumber={step.number}
                        completed={step.number < currentStep}
                        onClick={() => alert(step.number)}
                        active={step.number === currentStep}
                    >
                        <div>{step.name}</div>
                        <MdKeyboardArrowRight />
                    </Step>
                ))}
            </Container>
        </Wrapper>
    )
}

export default StepNavigation
