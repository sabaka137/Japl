import React, { useState } from 'react'
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
import DonePage from './Steps/DonePage'
import { User } from '../../types/User/UserTypes'

const Container = styled.div`
    background: white;
    padding: 20px 20px 20px 35px;
    min-height: 700px;
    width: 700px;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 30px auto;
    @media (max-width: 820px) {
        width: 100%;
    }
`
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
    } = useForm<{ general: User }>({
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
                price: '',
            },
        },
    })
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<{ general: User }> = (data) => {
        let gmt = new Date().getTimezoneOffset() / 60
        data.general.schedule.forEach((el) => {
            let timeArr = [
                '01:00',
                '01:30',
                '02:00',
                '02:30',
                '03:00',
                '03:30',
                '04:00',
                '04:30',
                '05:00',
                '05:30',
                '06:00',
                '06:30',
                '07:00',
                '07:30',
                '08:00',
                '08:30',
                '09:00',
                '09:30',
                '10:00',
                '10:30',
                '11:00',
                '11:30',
                '12:00',
                '12:30',
                '13:00',
                '13:30',
                '14:00',
                '14:30',
                '15:00',
                '15:30',
                '16:00',
                '16:30',
                '17:00',
                '17:30',
                '18:00',
                '18:30',
                '19:00',
                '19:30',
                '20:00',
                '20:30',
                '21:00',
                '21:30',
                '22:00',
                '22:30',
                '23:00',
                '23:30',
                '00:00',
                '00:30',
            ]
            //fix-tye
            let test: any = []
            el.time.forEach((time: any) => {
                let firstIndex = timeArr.indexOf(time.from) + gmt * 2
                let lastIndex = timeArr.indexOf(time.to) + gmt * 2
                if (firstIndex < timeArr.length && lastIndex < timeArr.length) {
                    if (firstIndex < 0 && lastIndex < 0) {
                        test.push(
                            ...timeArr.slice(
                                timeArr.length - Math.abs(firstIndex),
                                timeArr.length - Math.abs(lastIndex) + 1
                            )
                        )
                    }
                    if (firstIndex < 0 && lastIndex > 0) {
                        let res = []
                        res.push(
                            ...timeArr.slice(
                                timeArr.length - Math.abs(firstIndex),
                                timeArr.length
                            )
                        )
                        res.push(...timeArr.slice(0, lastIndex + 1))
                        test.push(...res)
                    }
                    if (firstIndex > 0 && lastIndex > 0) {
                        test.push(...timeArr.slice(firstIndex, lastIndex + 1))
                    }
                } else {
                    if (
                        firstIndex > timeArr.length &&
                        lastIndex > timeArr.length
                    ) {
                        test.push(
                            ...timeArr.slice(
                                firstIndex - timeArr.length,
                                lastIndex - timeArr.length + 1
                            )
                        )
                    }
                    if (
                        firstIndex < timeArr.length &&
                        lastIndex > timeArr.length
                    ) {
                        let res = []
                        res.push(...timeArr.slice(firstIndex, timeArr.length))
                        res.push(
                            ...timeArr.slice(0, lastIndex - timeArr.length + 1)
                        )
                        test.push(...res)
                    }
                }
            })
            el.time = []
            Array.from(new Set(test)).forEach((te) => {
                el.time.push({ time: te, isAvailable: true })
            })
        })
        dispatch(AuthSliceAsyncActions.Registration({ ...data.general })).then(res=>{
            navigate('/groups')
        })

    }
    const navigate = useNavigate()
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
            case 8:
                return <DonePage />
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
                </Container>
            </ContentContainer>
        </div>
    )
}

export default TeacherRegistration
