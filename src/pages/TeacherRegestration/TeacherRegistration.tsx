import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/hook'

import { AuthSliceAsyncActions } from '../../redux/reducers/AuthSlice'

import { ContentContainer } from '../../components/Common'
import StepNavigation from './components/StepNavigation'
import { GeneralInfo } from './Steps/GeneralInfo'
import { ProfileCertificates } from './Steps/ProfileCertificates'
import { ProfileDescription } from './Steps/ProfileDescription'
import { ProfileSchedule } from './Steps/ProfileSchedule/ProfileSchedule'
import { ProfiilePrice } from './Steps/ProfiilePrice'
import { ProfileEducation } from './Steps/ProfileEducation'
import ProfilePicture from './Steps/ProfilePicture/ProfilePicture'
import { TeacherReg, User, UserSchedule } from '../../types/User/UserTypes'
import { POSSIBLE_TIME_RANGE } from '../../constants/Time'
import { generate, generateSchedule } from './GenerateTeacher'
import { FACES } from './faces'

const Container = styled.div`
    background: white;
    padding: 20px 20px 50px 35px;
    min-height: 700px;
    width: 700px;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 30px auto;
    @media (max-width: 820px) {
        width: 100%;
    }
`
async function toDataURL(url: any, callback: any) {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        const reader = new FileReader()
        reader.onloadend = function () {
            callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
}
function TeacherRegistration() {
    const [step, setStep] = useState(1)
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        trigger,
        watch,
    } = useForm<{ general: TeacherReg }>({
        mode: 'onChange',
        defaultValues: {
            general: {
                role: 'teacher',
                password: '',
                name: '',
                email: '',
                photo: '',
                surname: '',
                country: '',
                languages: [
                    {
                        language: '',
                        level: '',
                    },
                ],
                certificates: [
                    {
                        name: '',

                        issued: '',
                        years: {
                            from: '',
                            to: '',
                        },
                    },
                ],
                education: {
                    name: '',
                    speciality: '',
                    diploma: '',
                    direction: '',
                    years: {
                        from: '',
                        to: '',
                    },
                },
                description: {
                    header: '',
                    interests: '',
                    experience: '',
                    motivation: '',
                },
                schedule: [
                    {
                        name: { full: 'Monday', short: 'Mon' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                    {
                        name: { full: 'Tuesday', short: 'Tue' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                    {
                        name: { full: 'Wednesday', short: 'Wed' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                    {
                        name: { full: 'Thursday', short: 'Thu' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                    {
                        name: { full: 'Friday', short: 'Fri' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                    {
                        name: { full: 'Saturday', short: 'Sat' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                    {
                        name: { full: 'Sunday', short: 'Sun' },
                        checked: true,
                        time: [{ from: '09:00', to: '17:00' }],
                    },
                ],
                price: 0,
            },
        },
    })
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<{ general: TeacherReg }> = (data) => {
        const gmt = new Date().getTimezoneOffset() / 60
        const convertedSchedule: UserSchedule[] = []
        //TODO looks terrible, rewrite
        data.general.schedule.forEach((el) => {
            const UTCTimeArray: string[] = []
            el.time.forEach((time) => {
                const firstIndex =
                    POSSIBLE_TIME_RANGE.indexOf(time.from) + gmt * 2
                const lastIndex = POSSIBLE_TIME_RANGE.indexOf(time.to) + gmt * 2
                if (
                    firstIndex < POSSIBLE_TIME_RANGE.length &&
                    lastIndex < POSSIBLE_TIME_RANGE.length
                ) {
                    if (firstIndex < 0 && lastIndex < 0) {
                        UTCTimeArray.push(
                            ...POSSIBLE_TIME_RANGE.slice(
                                POSSIBLE_TIME_RANGE.length -
                                    Math.abs(firstIndex),
                                POSSIBLE_TIME_RANGE.length -
                                    Math.abs(lastIndex) +
                                    1
                            )
                        )
                    }
                    if (firstIndex < 0 && lastIndex > 0) {
                        const res = []
                        res.push(
                            ...POSSIBLE_TIME_RANGE.slice(
                                POSSIBLE_TIME_RANGE.length -
                                    Math.abs(firstIndex),
                                POSSIBLE_TIME_RANGE.length
                            )
                        )
                        res.push(...POSSIBLE_TIME_RANGE.slice(0, lastIndex + 1))
                        UTCTimeArray.push(...res)
                    }
                    if (firstIndex > 0 && lastIndex > 0) {
                        UTCTimeArray.push(
                            ...POSSIBLE_TIME_RANGE.slice(
                                firstIndex,
                                lastIndex + 1
                            )
                        )
                    }
                } else {
                    if (
                        firstIndex > POSSIBLE_TIME_RANGE.length &&
                        lastIndex > POSSIBLE_TIME_RANGE.length
                    ) {
                        UTCTimeArray.push(
                            ...POSSIBLE_TIME_RANGE.slice(
                                firstIndex - POSSIBLE_TIME_RANGE.length,
                                lastIndex - POSSIBLE_TIME_RANGE.length + 1
                            )
                        )
                    }
                    if (
                        firstIndex < POSSIBLE_TIME_RANGE.length &&
                        lastIndex > POSSIBLE_TIME_RANGE.length
                    ) {
                        const res = []
                        res.push(
                            ...POSSIBLE_TIME_RANGE.slice(
                                firstIndex,
                                POSSIBLE_TIME_RANGE.length
                            )
                        )
                        res.push(
                            ...POSSIBLE_TIME_RANGE.slice(
                                0,
                                lastIndex - POSSIBLE_TIME_RANGE.length + 1
                            )
                        )
                        UTCTimeArray.push(...res)
                    }
                }
            })
            const timeArray: { time: string; isAvailable: boolean }[] = []

            if (el.checked) {
                Array.from(new Set(UTCTimeArray)).forEach((temp) => {
                    timeArray.push({ time: temp, isAvailable: true })
                })
            }

            convertedSchedule.push({ ...el, time: timeArray })
        })
        dispatch(
            AuthSliceAsyncActions.Registration({
                ...data.general,
                schedule: convertedSchedule,
            })
        ).then((res) => {
            navigate('/groups')
        })
    }
    const navigate = useNavigate()

    function createCouple() {
        for (let i = 0; i < 400; i++) {
            createTeacher()
        }
    }
    function createTeacher() {
        toDataURL(
            FACES[Math.floor(Math.random() * FACES.length)],
            function (dataUrl: any) {
                dispatch(AuthSliceAsyncActions.Registration(generate(dataUrl)))
            }
        )
    }
    function StepNavigate(step: number) {
        switch (step) {
            case 1:
                return (
                    <GeneralInfo
                        setStep={setStep}
                        control={control}
                        trigger={trigger}
                        errors={errors}
                        register={register}
                    />
                )
            case 2:
                return (
                    <ProfilePicture
                        setValue={setValue}
                        setStep={setStep}
                        trigger={trigger}
                        register={register}
                    />
                )
            case 3:
                return (
                    <ProfileCertificates
                        setStep={setStep}
                        control={control}
                        trigger={trigger}
                        setValue={setValue}
                        errors={errors}
                        register={register}
                    />
                )
            case 4:
                return (
                    <ProfileEducation
                        setStep={setStep}
                        control={control}
                        trigger={trigger}
                        setValue={setValue}
                        errors={errors}
                        register={register}
                    />
                )
            case 5:
                return (
                    <ProfileDescription
                        setStep={setStep}
                        watch={watch}
                        trigger={trigger}
                        errors={errors}
                        register={register}
                    />
                )
            case 6:
                return (
                    <ProfileSchedule
                        setStep={setStep}
                        control={control}
                        trigger={trigger}
                        errors={errors}
                        register={register}
                    />
                )
            case 7:
                return (
                    <ProfiilePrice
                        setStep={setStep}
                        errors={errors}
                        register={register}
                    />
                )
        }
    }
    return (
        <div
            //fix-inline
            style={{
                background: '#edf0f0',
                minHeight: window.innerHeight,
                padding: '0px 0px 70px 0px',
            }}
        >
            <StepNavigation currentStep={step} />
            <ContentContainer>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {StepNavigate(step)}
                    </form>
                    <div onClick={() => createCouple()}>generate one</div>
                </Container>
            </ContentContainer>
        </div>
    )
}

export default TeacherRegistration
