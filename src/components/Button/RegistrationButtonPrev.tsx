import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
const Button = styled.button`
    text-decoration: none;
    padding: 10px 20px;
    background: #3bb3bd;
    font-family: Inter;
    font-weight: bold;
    border-radius: 3px;
    color: white;
    border: none;
    margin-top: 30px;
    &:hover {
        cursor: pointer;
        background: #33aab4;
    }
`
type Props = {
    disabled?:boolean;
    setStep:Dispatch<SetStateAction<number>>;
    }
export const RegistrationButtonPrev = ({ disabled, setStep }:Props) => {
    function handleClick() {
        setStep((prevState: number) => prevState - 1)
    }
    return (
        <Button onClick={() => handleClick()} disabled={disabled}>
            Back 
        </Button>
    )
}
