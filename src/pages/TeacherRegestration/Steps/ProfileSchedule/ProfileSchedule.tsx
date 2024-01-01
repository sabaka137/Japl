import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    useForm,
    useFieldArray,
    FieldErrors,
    UseFormRegister,
    UseFormTrigger,
    Control,
} from 'react-hook-form'
import Day from './Day'
import { RegistrationButtonNext } from '../../../../components/Button/RegistrationButtonNext'
import { BiTrendingUp } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import { Flex, Text } from '../../../../components/Common'
import styled from 'styled-components'
import { RegistrationButtonPrev } from '../../../../components/Button/RegistrationButtonPrev'
import { TeacherReg, User } from '../../../../types/User/UserTypes'
import { ScheduleTip, ScheduleTipTop } from '../style'
const CustomCheckbox = styled.div`
    margin-bottom: 15px;
    span {
        margin-left: 10px;
        color: #384047;
        font-family: Inter;
    }
    svg {
        position: absolute;
        left: -1px;
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
    }
    input {
        position: absolute;
        opacity: 0;
        &:hover {
            cursor: pointer;
        }
    }
    input:checked {
        & + label::before {
            border: 1px solid #3bb3bd;
            background: #3bb3bd;
        }
    }
    label {
        display: flex;
        position: relative;
        align-items: center;
        &:hover {
            cursor: pointer;
            &:before {
                border-color: #3bb3bd;
            }
        }
        &:before {
            content: '';
            display: flex;
            align-items: center;
            border-radius: 3px;
            color: white;
            justify-content: center;
            font-size: 13px;
            width: 15px;
            height: 15px;
            border: 1px solid #dadfe1;
        }
    }
`
const CheckBox = styled.span`
    position: relative;

    padding: 0px 26px;
    &:before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        left: 0px;
        top: 1px;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid rgb(218, 223, 225);
        background-color: rgb(255, 255, 255);
        transition:
            border-color 0s ease 0s,
            background-color 0s ease 0s,
            all 50ms ease 0s;
    }
`
type Props = {
    setStep: React.Dispatch<React.SetStateAction<number>>
    control: Control<{
        general: TeacherReg
    }>
    trigger: UseFormTrigger<{
        general: TeacherReg
    }>
    errors: FieldErrors<{
        general: TeacherReg
    }>
    register: UseFormRegister<{
        general: TeacherReg
    }>
}
export const ProfileSchedule = ({
    control,
    setStep,
    register,
    errors,
    trigger,
}: Props) => {
    const { fields, append, remove } = useFieldArray({
        name: 'general.schedule',
        control,
    })
    const [Days, setDays] = useState(fields)

    function setChecked(checked: any, index: number) {
        setDays(
            Days.map((item, currentIndex) =>
                currentIndex === index
                    ? { ...item, checked: !item.checked }
                    : { ...item }
            )
        )
    }

    return (
        <>
            <Text
                color="#090F19"
                ff="Inter"
                fz="20px"
                margin="0px 0px 20px 0px"
            >
                Schedule
            </Text>
            <Text
                color="#6F757B"
                ff="Inter"
                fz="14px"
                margin="0px 0px 30px 0px"
            >
                The schedule shows your working hours. <br /> Students can book
                lessons at this time
            </Text>
            <ScheduleTip>
                <ScheduleTipTop>
                    <div>
                        <BiTrendingUp
                            fontSize={'1.3rem'}
                            style={{ marginRight: '5px' }}
                        />
                    </div>
                    Add peak hours and get more students
                </ScheduleTipTop>
                <Text color="#090F19" ff="Inter" fz="0.9rem" fw="500">
                    Many students book lessons between 21:00 and 24:00. Add this
                    peak time to your schedule to increase your chances of of
                    booking a lesson.
                </Text>
            </ScheduleTip>
            <div>
                {fields.map((field: any, index) => (
                    <div key={field.id} style={{ marginBottom: '30px' }}>
                        <CustomCheckbox>
                            <input
                                id={String(index)}
                                type="checkbox"
                                {...register(
                                    `general.schedule.${index}.checked`,
                                    {
                                        onChange: (e) =>
                                            setChecked(e.target.checked, index),
                                    }
                                )}
                            />
                            <label htmlFor={String(index)}>
                                <BsCheck />
                                <span>{field.name.full}</span>
                            </label>
                        </CustomCheckbox>
                        {Days[index].checked && (
                            <Day
                                control={control}
                                errors={
                                    errors?.general?.schedule
                                        ? errors?.general?.schedule[index]
                                        : {}
                                }
                                index={index}
                            />
                        )}
                    </div>
                ))}
            </div>

            <Flex gap={'10px'}>
                <RegistrationButtonPrev setStep={setStep} />
                <RegistrationButtonNext trigger={trigger} setStep={setStep} />
            </Flex>
        </>
    )
}
