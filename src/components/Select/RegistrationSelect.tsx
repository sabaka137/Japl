import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import styled from 'styled-components'

const SelectWrapper = styled.div<{ isRange: boolean }>`
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
    margin-bottom:5px;
    font-weight: 500;
    color: #090f19;
    font-size: 0.9rem;
`
//fix-type
type Props = {
    control?: any
    options?: any
    formName?: any
    errors?: any
    label?: any
    isRange?: any
}
export const RegistrationSelect = ({
    control,
    options,
    formName,
    errors,
    isRange,
    label
}: Props) => {
    return (
        <>
       
            <SelectWrapper isRange={isRange}>
            <Label>{label}</Label>
                <Controller
                    rules={{ required: 'Required field' }}
                    control={control}
                    defaultValue={options.map((c: any) => c.value)}
                    name={formName}
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            value={options.filter((c: any) =>
                                value.includes(c.value)
                            )}
                            onChange={(val) => onChange(val.value)}
                            options={options}
                            isMulti={false}
                        />
                    )}
                />
                {errors && <ErrorMessage>{errors?.message}</ErrorMessage>}
            </SelectWrapper>
        </>
    )
}
