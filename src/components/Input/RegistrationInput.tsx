import styled from 'styled-components'
import { Flex } from '../Common'
import { ErrorMessage } from '../../pages/TeacherRegestration/style'
const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;
    position:relative;
`
const Label = styled.label`
    display: block;
    font-family: Inter;
    font-weight: 500;
    color: #090f19;
    font-size: 0.9rem;
`
const Text = styled.div`
    margin-left: 10px;
    color: #52667d;
    font-family: Inter;
    font-size: 0.9rem;
`
const InputWrapper = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    @media (max-width: 720px) {
        width: 100%;
    }
`
const Input = styled.input<{ error: boolean }>`
    width: 100%;
    margin-top: 5px;
    padding: 10px 12px;
    border: ${(props) => (props.error ? '1px solid red' : '1px solid #dadfe1')};
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
    &:focus {
        box-shadow: rgb(206, 237, 240) 0px 0px 8px;
        border-color: rgb(59, 179, 189);
    }
`

//TODO: fix types
type Props = {
    props?: any
    label?: string
    value?: string
    width: string
    text?: string
    errors?: any
    type: string
}
export const RegistrationInput = ({
    props,
    label,
    value,
    width,
    text,
    errors,
    type,
}: Props) => {
    return (
        <Wrapper>
            <Label>{label}</Label>
            {value == '' ? (
                <InputWrapper width={width}>
                    <Input {...props} />
                    <ErrorMessage>{errors?.message}</ErrorMessage>
                </InputWrapper>
            ) : (
                <>
                    <Flex align="center">
                        <InputWrapper width={width}>
                            <Input
                                type={type}
                                error={errors !== undefined}
                                value={value}
                                {...props}
                            />
                        </InputWrapper>
                        <Text>{text}</Text>
                    </Flex>
                    <ErrorMessage>{errors?.message}</ErrorMessage>
                </>
            )}
        </Wrapper>
    )
}

export default RegistrationInput
