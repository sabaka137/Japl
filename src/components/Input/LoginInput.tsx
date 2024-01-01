import React from 'react'
import styled from 'styled-components'
import { Flex } from '../Common'
import { ErrorMessage } from '../../pages/TeacherRegestration/style'
const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
`
const Label = styled.label`
    display: block;
    font-family: Inter;
    font-weight: 500;
    color: #090f19;
    font-size: 0.9rem;
`
const InputWrapper = styled.div`
    width: 100%;
    @media (max-width: 720px) {
        width: 100%;
    }
`
const Input = styled.input<{ error: boolean }>`
    width: 100%;
    margin-top: 5px;
    padding: 15px 12px;
    font-size: 1rem;
    border: ${(props) => (props.error ? '1px solid red' : '1px solid #dadfe1')};
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
    &:focus {
        box-shadow: rgb(206, 237, 240) 0px 0px 8px;
        border-color: rgb(59, 179, 189);
    }
`

type Props = {
    props: any
    label: string
    value?: string
    errors: any
    placeholder: string
}
export const LoginInput = ({
    props,
    label,
    value,
    errors,
    placeholder,
}: Props) => {
    return (
        <Wrapper>
            <Label>{label}</Label>

            <Flex align="center">
                <InputWrapper>
                    <Input
                        placeholder={placeholder}
                        error={errors !== undefined}
                        value={value}
                        {...props}
                    />
                    <ErrorMessage>{errors?.message}</ErrorMessage>
                </InputWrapper>
            </Flex>
        </Wrapper>
    )
}
