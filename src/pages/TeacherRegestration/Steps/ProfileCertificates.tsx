import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    useForm,
    useFieldArray,
    Controller,
    FieldErrors,
    UseFormRegister,
    UseFormTrigger,
    UseFormSetValue,
    Control,
} from 'react-hook-form'
import { RegistrationButtonNext } from '../../../components/Button/RegistrationButtonNext'
import RegistrationInput from '../../../components/Input/RegistrationInput'

import { Flex, Text } from '../../../components/Common'
import { RegistrationSelect } from '../../../components/Select/RegistrationSelect'
import { SelectRangeWrapper } from '../style'
import { RegistrationButtonPrev } from '../../../components/Button/RegistrationButtonPrev'
import { generateYears } from '../../../utils/GenerateYearsRange'
import { TeacherReg, User } from '../../../types/User/UserTypes'
import { SkipInfo } from './style'
import { CERTIFICATE } from '../../../constants/data'
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
export const ProfileCertificates = ({
    control,
    setStep,
    register,
    trigger,
    errors,
    setValue,
}: Props) => {
    const [years, setYears] = useState<{ value: string; label: string }[]>([])
    const [firstNumber, setFirstNumber] = useState(0)
    const [secondNumber, setSecondNumber] = useState(0)
    const [checked, setChecked] = useState(false)
    const { fields, append, remove } = useFieldArray({
        name: 'general.certificates',
        control,
    })
    useEffect(() => {
        setYears(generateYears())
    }, [])
    useEffect(() => {
        if (years.length === 0) return
        if (firstNumber === Number(years[0].value)) {
            setValue(`general.certificates.0.years.to`, '')
        }
    }, [firstNumber, secondNumber, years])
    return (
        <div>
            <Text
                color="#090F19"
                ff="Inter"
                fz="20px"
                margin="0px 0px 20px 0px"
            >
                Teaching Certificates
            </Text>
            <Text
                color="#6F757B"
                ff="Inter"
                fz="14px"
                margin="0px 0px 30px 0px"
            >
                Do you have teaching certifications? Describe them so that your
                profile is credible and more students will come to you.
            </Text>
            <SkipInfo onClick={() => setChecked(!checked)}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <Text
                    //fix-inline
                    color="#384047"
                    ff="Inter"
                    fz="14px"
                >
                    I don&apos;t have teaching certifications yet
                </Text>
            </SkipInfo>
            {!checked &&
                fields.map((field, index) => (
                    <div key={field.id}>
                        <div style={{ marginBottom: '20px' }}>
                            <Text
                                ff="Inter"
                                color="#090F19"
                                fz="0.9rem"
                                margin="0px 0px 5px 0px"
                                fw="500"
                            >
                                Certificate
                            </Text>
                            <RegistrationSelect
                                control={control}
                                options={CERTIFICATE}
                                errors={
                                    errors?.general?.certificates![index]?.name
                                }
                                formName={`general.certificates.${index}.name`}
                            />
                        </div>
                        <RegistrationInput
                            type="text"
                            width={'65%'}
                            errors={
                                errors?.general?.certificates![index]?.issued
                            }
                            label={'Issued'}
                            props={{
                                ...register(
                                    `general.certificates.${index}.issued`,
                                    {
                                        required: 'Required field',
                                    }
                                ),
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
                                    setFirstNumber={setFirstNumber}
                                    firstRange
                                    control={control}
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
                                    formName={`general.certificates.${index}.years.from`}
                                    errors={
                                        errors?.general?.certificates![index]
                                            ?.years?.from
                                    }
                                />
                                <RegistrationSelect
                                    isRange={true}
                                    setSecondNumber={setSecondNumber}
                                    secondRange
                                    control={control}
                                    options={years.filter(
                                        (year) =>
                                            Number(year.value) > firstNumber
                                    )}
                                    formName={`general.certificates.${index}.years.to`}
                                    errors={
                                        errors?.general?.certificates![index]
                                            ?.years?.to
                                    }
                                />
                            </SelectRangeWrapper>
                        </div>
                    </div>
                ))}

            <Flex gap={'10px'}>
                <RegistrationButtonPrev setStep={setStep} />
                <RegistrationButtonNext trigger={trigger} setStep={setStep} />
            </Flex>
        </div>
    )
}
