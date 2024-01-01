import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { IoEarthSharp } from 'react-icons/io5'
import { Flex } from '../../../components/Common'
import { NavLink } from 'react-router-dom'
import { User, UserSchedule } from '../../../types/User/UserTypes'
import { ScheduleStats } from '../../../types/Teachers/TeachersType'
const Wrapper = styled.div<{ isFirst: boolean }>`
    width: 35%;
    max-width: 410px;
    box-sizing: border-box;
    padding: 15px;
    background: #ffffff;
    border-radius: 30px;
    position: absolute;
    transition: 0.25s linear all;
    top: 0px;
    right: 0px;

    @media (max-width: 1300px) {
        width: 300px;
    }
    @media (max-width: 1000px) {
        display: none;
    }
    &::before {
        content: '';
        display: block;
        position: absolute;
        left: -20px;
        transition: 0.4s ease all;
        top: ${(props) => (props.isFirst ? '20%' : 'calc(50% - 15px)')};
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 20px 21px 20px 0;
        border-color: transparent white transparent transparent;
    }
`
const VideoContainer = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 20px;
    background: lightgrey;
`

const TimeMessage = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6f757b;
    font-family: Iter;
    font-weight: 500;
    margin: 15px 0px;
`
const ScheduleRange = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 0px 0px 10px;
    background: #f8f8f8;
    height: 50px;
    font-size: 0.7rem;
    color: #6f757b;
    @media (max-width: 1300px) {
        height: 30px;
        div {
            display: none;
        }
    }
`
const ScheduleRangeStat = styled.div<{ bg: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.bg};
    height: 50px;
    @media (max-width: 1300px) {
        height: 30px;
    }
`
const FullScheduuleLink = styled(NavLink)`
    display: flex;
    width: 100%;

    height: 45px;
    background: #f7f5f2;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 1.05rem;
    font-family: Noto Sans;
    font-weight: 500;
    color: #090f19;
    text-decoration: none;
`
type Props = {
    modalPosition: {
        top: number
        left: number
        isFirst: boolean
    }
    schedule: UserSchedule[]
    teacher: User
}
export const SideBar = ({ teacher, modalPosition, schedule }: Props) => {
    const [scheduleStat, setScheduleStat] = useState<any[]>([])

    const WRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (modalPosition.isFirst) {
            WRef.current!.style.top = modalPosition.top - 0 + 'px'
        } else {
            WRef.current!.style.top = modalPosition.top - 50 + 'px'
        }

        WRef.current!.style.left = modalPosition.left + 20 + 'px'
    }, [modalPosition])
    //TODO вынести в константу
    const morning = [
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
    ]
    const day = [
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
    ]
    const evening = [
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
    ]
    const night = [
        '00:00',
        '00:30',
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
    ]
    const scheduleMemo = useMemo(() => chechSchedule(), [schedule])
    function chechSchedule() {
        const res: ScheduleStats[] = []
        schedule.forEach((el) => {
            const temp = { morning: 0, day: 0, evening: 0, night: 0 }
            el.time.forEach((time) => {
                if (morning.includes(time.time)) {
                    temp.morning += 1
                }
                if (day.includes(time.time)) {
                    temp.day += 1
                }
                if (evening.includes(time.time)) {
                    temp.evening += 1
                }
                if (night.includes(time.time)) {
                    temp.night += 1
                }
            })
            res.push(temp)
        })
        setScheduleStat(res)
    }

    function getScheduleColor(count: number) {
        if (!count) {
            return '#f8f8f8'
        }
        if (count < 3) {
            return '#daf2dc'
        }
        if (count > 3 && count < 8) {
            return '#55df61'
        }
        return '#22ae25'
    }
    return (
        <Wrapper isFirst={modalPosition.isFirst} ref={WRef}>
            <div>
                {scheduleStat.length !== 0 && (
                    <Flex style={{ width: '100%', gap: '2px' }}>
                        <Flex style={{ width: '20%', gap: '2px' }}>
                            <Flex
                                direction="column"
                                justify="space-between"
                                gap={'2px '}
                                style={{ flex: '1' }}
                            >
                                <ScheduleRange></ScheduleRange>
                                <ScheduleRange>
                                    <div>Morning</div>
                                    <span>06:00-12:00</span>
                                </ScheduleRange>
                                <ScheduleRange>
                                    <div>Day</div>
                                    <span>12:00-18:00</span>
                                </ScheduleRange>
                                <ScheduleRange>
                                    <div>Evening</div>
                                    <span>18:00-24:00</span>
                                </ScheduleRange>
                                <ScheduleRange>
                                    <div>Night</div>
                                    <span> 00:00-06:00</span>
                                </ScheduleRange>
                            </Flex>
                        </Flex>
                        <Flex style={{ width: '80%', gap: '2px' }}>
                            {schedule.map((el, index: number) => (
                                <Flex
                                    key={index}
                                    direction="column"
                                    justify="space-between"
                                    gap={'2px '}
                                    style={{ flex: '1' }}
                                >
                                    <Flex
                                        justify="center"
                                        align="center"
                                        style={{
                                            background: '#f8f8f8',
                                            height: '50px',
                                            fontSize: '0.8rem',

                                            color: '#52667D',
                                            textTransform: 'lowercase',
                                        }}
                                    ></Flex>
                                    <ScheduleRangeStat
                                        bg={getScheduleColor(
                                            scheduleStat[index].morning
                                        )}
                                    />

                                    <ScheduleRangeStat
                                        bg={getScheduleColor(
                                            scheduleStat[index].day
                                        )}
                                    />
                                    <ScheduleRangeStat
                                        bg={getScheduleColor(
                                            scheduleStat[index].evening
                                        )}
                                    />
                                    <ScheduleRangeStat
                                        bg={getScheduleColor(
                                            scheduleStat[index].night
                                        )}
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                )}
            </div>
            <FullScheduuleLink target="_blank" to={`/teacher/${teacher._id}`}>
                View full schedule
            </FullScheduuleLink>
        </Wrapper>
    )
}

export default SideBar
