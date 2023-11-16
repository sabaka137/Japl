import styled from 'styled-components'
import { RegistrationButtonNext } from '../../../components/Button/RegistrationButtonNext'
import RegistrationInput from '../../../components/Input/RegistrationInput'
import { RegistrationButtonPrev } from '../../../components/Button/RegistrationButtonPrev'
import { Flex, Text } from '../../../components/Common'
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { User } from '../../../types/User/UserTypes'
import { Dispatch, SetStateAction } from 'react'
import { PriceTip } from './style'

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
    errors: FieldErrors<{ general: User }> | undefined
    register: UseFormRegister<{ general: User }>
    setStep: Dispatch<SetStateAction<number>>
}
export const ProfiilePrice = ({ setStep, register, errors }: Props) => {
    return (
        <div>
            <Text
                color="#090F19"
                ff="Inter"
                fz="20px"
                margin="0px 0px 20px 0px"
            >
                Set the base hourly rate
            </Text>
            <PriceTip>
                To attract more students to your profile, we recommend a a base
                rate of $ per hour for new tutors in your subject and with your
                level of experience.
            </PriceTip>

            <RegistrationInput
                type="text"
                width={'200px'}
                text={'$ USD'}
                label={'Price'}
                errors={errors?.general?.price}
                props={{
                    ...register(`general.price`, {
                        required: 'Required field',
                        maxLength: 3,
                        pattern: {
                            value: /^-?\d*\.?\d*$/,
                            message: 'The number must be an integer',
                        },
                    }),
                }}
            />

            <Flex gap={'10px'}>
                <RegistrationButtonPrev setStep={setStep} />
                <Button type="submit">Confirm</Button>
            </Flex>
        </div>
    )
}