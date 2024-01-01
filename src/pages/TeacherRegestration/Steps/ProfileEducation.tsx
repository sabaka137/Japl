import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RegistrationButtonNext } from '../../../components/Button/RegistrationButtonNext'
import RegistrationInput from '../../../components/Input/RegistrationInput'

import { Flex, Text } from '../../../components/Common'
import { RegistrationSelect } from '../../../components/Select/RegistrationSelect'
import { SelectRangeWrapper } from '../style'
import { RegistrationButtonPrev } from '../../../components/Button/RegistrationButtonPrev'
import { generateYears } from '../../../utils/GenerateYearsRange'
import { TeacherReg, User } from '../../../types/User/UserTypes'
import {
    Control,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form'
import { SkipInfo } from './style'
import { DIPLOMA } from '../../../constants/data'

type Props = {
    errors: FieldErrors<{ general: TeacherReg }> | undefined
    register: UseFormRegister<{ general: TeacherReg }>
    control: Control<{
        general: TeacherReg
    }>
    setStep: Dispatch<SetStateAction<number>>
    trigger: UseFormTrigger<{ general: TeacherReg }>
    setValue: UseFormSetValue<{
        general: TeacherReg
    }>
}

export const ProfileEducation = ({
    control,
    setStep,
    register,
    errors,
    trigger,
    setValue,
}: Props) => {
    const [firstNumber, setFirstNumber] = useState(0)
    const [secondNumber, setSecondNumber] = useState(0)
    const [years, setYears] = useState<{ value: string; label: string }[]>([])
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setYears(generateYears())
    }, [])
    useEffect(() => {
        if (years.length === 0) return
        if (years && firstNumber === Number(years[0].value)) {
            setValue(`general.education.years.to`, '')
        }
    }, [firstNumber, secondNumber, years])

    return (
        <>
            <Text
                color="#090F19"
                ff="Inter"
                fz="20px"
                margin="0px 0px 20px 0px"
            >
                Education
            </Text>
            <Text
                color="#6F757B"
                ff="Inter"
                fz="14px"
                margin="0px 0px 30px 0px"
            >
                Tell the students about the college education you have received
                or are in the process of getting
            </Text>
            <SkipInfo onClick={() => setChecked(!checked)}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <Text color="#384047" ff="Inter" fz="14px">
                    I don&apos;t have a college degree
                </Text>
            </SkipInfo>
            {!checked && (
                <div>
                    <RegistrationInput
                        type="text"
                        label={'University'}
                        width={'65%'}
                        errors={errors?.general?.education?.name}
                        props={{
                            ...register(`general.education.name`, {
                                required: 'Required field',
                            }),
                        }}
                    />
                    <RegistrationInput
                        type="text"
                        width={'65%'}
                        errors={errors?.general?.education?.speciality}
                        label={'Specialty'}
                        props={{
                            ...register(`general.education.speciality`, {
                                required: 'Required field',
                            }),
                        }}
                    />
                    <label style={{ marginBottom: '20px', display: 'block' }}>
                        <span style={{ marginBottom: '5px', display: 'block' }}>
                            Diploma
                        </span>
                        <RegistrationSelect
                            control={control}
                            options={DIPLOMA}
                            errors={errors?.general?.education?.diploma}
                            formName={`general.education.diploma`}
                        />
                    </label>
                    <RegistrationInput
                        type="text"
                        width={'65%'}
                        label={'Сourse'}
                        errors={errors?.general?.education?.direction}
                        props={{
                            ...register(`general.education.direction`, {
                                required: 'Required field',
                            }),
                        }}
                    />
                    <div>
                        <Text
                            ff="Inter"
                            fz="0.9rem"
                            fw="500"
                            margin="0px 0px 5px 0px"
                        >
                            Years of study
                        </Text>
                        <SelectRangeWrapper>
                            <RegistrationSelect
                                isRange={true}
                                control={control}
                                setFirstNumber={setFirstNumber}
                                firstRange
                                options={
                                    secondNumber === 0
                                        ? years
                                        : firstNumber === 0
                                          ? years.filter(
                                                (year) =>
                                                    Number(year.value) <
                                                    secondNumber
                                            )
                                          : years
                                }
                                formName={`general.education.years.from`}
                                errors={errors?.general?.education?.years?.from}
                            />
                            <RegistrationSelect
                                isRange={true}
                                setSecondNumber={setSecondNumber}
                                secondRange
                                control={control}
                                options={years.filter(
                                    (year) => Number(year.value) > firstNumber
                                )}
                                formName={`general.education.years.to`}
                                errors={errors?.general?.education?.years?.to}
                            />
                        </SelectRangeWrapper>
                    </div>
                </div>
            )}

            <Flex gap={'10px'}>
                <RegistrationButtonPrev setStep={setStep} />
                <RegistrationButtonNext trigger={trigger} setStep={setStep} />
            </Flex>
        </>
    )
}
