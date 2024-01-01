import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    useForm,
    useFieldArray,
    FieldErrors,
    UseFormRegister,
    UseFormTrigger,
    UseWatchProps,
} from 'react-hook-form'
import { RegistrationButtonNext } from '../../../components/Button/RegistrationButtonNext'
import styled from 'styled-components'
import { RegistrationButtonPrev } from '../../../components/Button/RegistrationButtonPrev'
import { Flex, Text } from '../../../components/Common'
import { TeacherReg, User } from '../../../types/User/UserTypes'
const DescriptionContainer = styled.div`
    border-bottom: 1px solid #d8dfe6;
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 65%;
    textarea {
        width: 100%;
        box-sizing: border-box;
        min-height: 200px;
        border: 1px solid #d8dfe6;
        resize: none;
        outline: none;
        font-family: Inter;
        padding: 10px;
        font-size: 0.9rem;
        &:focus {
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
            border: 1px solid #d8dfe6;
        }
    }
    @media (max-width: 820px) {
        width: 100%;
    }
`

const DescriptionHeader = styled.div`
    color: #192435;
    font-size: 1.3rem;
    font-weight: 500;
    font-family: Inter;
    margin-bottom: 20px;
    &:hover {
        cursor: pointer;
    }
`
const ErrorMessage = styled.div`
    color: #fa7070;
    font-family: Inter;
    font-size: 14px;
`
const DescriptionItem = styled.div``

const NextButton = styled.button<{ active: boolean }>`
    background: #f8f8f8;
    color: ${(props) => (props.active ? '#33AAB4' : '#aeb5bc')};
    border: ${(props) =>
        props.active ? '1px solid #33AAB4' : '1px solid #aeb5bc'};
    font-family: Inter;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 3px;
    margin: 10px 0px;
    cursor: ${(props) => (props.active ? 'pointer' : '')};
`
const DescriptionHelp = styled.div`
    font-family: Inter;

    color: #52667d;
    font-size: 0.9rem;
    margin-bottom: 15px;
`
const Data = [
    {
        formField: 'interests',
        header: '1. Introduce yourself',
        desc: 'Show yourself to potential students! Talk about your teaching experience and passion for teaching, mention your interests and hobbies.',
        placeholder: "Hi, my name is... I'm from...",
        minLength: 250,
        maxLength: 650,
    },
    {
        formField: 'experience',
        header: '2. Teaching experience',
        minLength: 100,
        maxLength: 700,
        desc: 'Give a detailed description of your teaching experience. Add certifications, teaching methodology, education, and subject matter expertise.',
        placeholder:
            'I have 5 years of teaching experience. I have a TEFL certificate and my lessons are...',
    },
    {
        formField: 'motivation',
        header: '3. Get potential students interested',
        desc: 'Inspire students to book their first lesson. Emphasize the benefits of learning with you!',
        minLength: 15,
        maxLength: 250,
        placeholder:
            'Sign up for my trial lesson so we can discuss your goals and how I can help you achieve them....',
    },
    {
        formField: 'header',
        header: '4. Write a catchy headline',
        minLength: 10,
        maxLength: 35,
        desc: 'The headline is the first thing students see. Make it eye-catching, mention a specific language of instruction, and encourage students to look at your profile for more information.',
        placeholder: 'Certified tutor with 5 years of experience',
    },
]

//fix-types
type Props = {
    watch: any
    setStep: React.Dispatch<React.SetStateAction<number>>
    register: any
    errors: any
    trigger: UseFormTrigger<{
        general: TeacherReg
    }>
}
export const ProfileDescription = ({
    watch,
    setStep,
    register,
    errors,
    trigger,
}: Props) => {
    const [subStep, setSubStep] = useState(0)
    return (
        <>
            <div>
                <Text
                    color="#090F19"
                    fz="28px"
                    ff="Inter"
                    fw="500"
                    margin="20px 0px 20px 0px"
                >
                    Profile Description
                </Text>

                {Data.map((item, index) => (
                    <DescriptionContainer key={index}>
                        <DescriptionHeader onClick={() => setSubStep(index)}>
                            {item.header}
                        </DescriptionHeader>
                        <DescriptionItem
                            style={{
                                display: index === subStep ? 'block' : 'none',
                            }}
                        >
                            <DescriptionHelp>{item.desc}</DescriptionHelp>
                            <textarea
                                placeholder={item.placeholder}
                                {...register(
                                    `general.description.${item.formField}`,
                                    {
                                        minLength: {
                                            value: item.minLength,
                                            message: `The minimum length must be more than ${item.minLength}`,
                                        },
                                        maxLength: {
                                            value: item.maxLength,
                                            message:
                                                'Field should be short so that students pay attention to it',
                                        },
                                    }
                                )}
                            />
                            {
                                <ErrorMessage>
                                    {
                                        errors?.general?.description[
                                            item.formField
                                        ]?.message
                                    }
                                </ErrorMessage>
                            }
                            <NextButton
                                type="button"
                                onClick={() =>
                                    errors?.general?.description[
                                        item.formField
                                    ] === undefined &&
                                    setSubStep((prevState) => prevState + 1)
                                }
                                active={
                                    watch(
                                        `general.description.${item.formField}`
                                    ).length !== 0
                                }
                                style={{ marginBottom: '20px' }}
                            >
                                Continue
                            </NextButton>
                        </DescriptionItem>
                    </DescriptionContainer>
                ))}
            </div>

            <Flex gap={'10px'}>
                <RegistrationButtonPrev setStep={setStep} />
                <RegistrationButtonNext trigger={trigger} setStep={setStep} />
            </Flex>
        </>
    )
}
