import React, { useState } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import Select from 'react-select'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { TeacherReg } from '../../types/User/UserTypes'

const SelectWrapper = styled.div<{ isRange: boolean | undefined }>`
    width: ${(props) => (props.isRange ? '100' : '65')}%;
    @media (max-width: 720px) {
        width: 100%;
    }
`
const ErrorMessage = styled.div`
    color: #f8463d;
    font-family: Inter;
    font-size: 0.9rem;
    margin-top: 3px;
`
const Label = styled.label`
    display: block;
    font-family: Inter;
    margin-bottom: 5px;
    font-weight: 500;
    color: #090f19;
    font-size: 0.9rem;
`
//TODO fix-type
type SelectValue = {
    value: string
    label: string
}
type Props = {
    control?: Control<{
        general: TeacherReg
    }>
    options: SelectValue[]
    formName?: any
    errors?: any
    label?: string
    isRange?: boolean
    props?: any
    mustBeUnique?: boolean
    firstRange?: boolean
    secondRange?: boolean
    setFirstNumber?: React.Dispatch<React.SetStateAction<number>>
    setSecondNumber?: React.Dispatch<React.SetStateAction<number>>
    setLanguages?: React.Dispatch<
        React.SetStateAction<
            {
                label: string
                value: string
                isAvailable: boolean
            }[]
        >
    >
}
export const RegistrationSelect = ({
    control,
    options,
    formName,
    errors,
    isRange,
    label,
    mustBeUnique,
    setLanguages,
    firstRange,
    secondRange,
    setFirstNumber,
    setSecondNumber,
}: Props) => {
    const [currentValue, setCurrentValue] = useState('')
    function handleChange(value: string) {
        setCurrentValue(value)
        if (mustBeUnique && setLanguages) {
            setLanguages((prev) =>
                prev.map((item) =>
                    item.value === value
                        ? { ...item, isAvailable: false }
                        : {
                              ...item,
                          }
                )
            )
            setLanguages((prev) =>
                prev.map((item) =>
                    item.value === currentValue
                        ? { ...item, isAvailable: true }
                        : { ...item }
                )
            )
        }
    }
    function pickYear(year: string) {
        if (firstRange && setFirstNumber) {
            setFirstNumber(Number(year))
        }
        if (secondRange && setSecondNumber) {
            setSecondNumber(Number(year))
        }
    }

    return (
        <>
            <SelectWrapper isRange={isRange}>
                <Label>{label}</Label>
                <Controller
                    rules={{ required: 'Required field' }}
                    control={control}
                    defaultValue={options.map((c: SelectValue) => c.value)}
                    name={formName}
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: errors
                                        ? '#FA7070'
                                        : 'rgb(218, 223, 225)',
                                }),
                            }}
                            maxMenuHeight={200}
                            value={options.filter((c: SelectValue) =>
                                value.includes(c.value)
                            )}
                            onChange={(val) => (
                                onChange(val?.value),
                                pickYear(val!.value),
                                handleChange(val!.value)
                            )}
                            options={
                                mustBeUnique
                                    ? options.filter(
                                          (item: any) => item.isAvailable
                                      )
                                    : options
                            }
                            isMulti={false}
                        />
                    )}
                />
                {errors && <ErrorMessage></ErrorMessage>}
            </SelectWrapper>
        </>
    )
}
