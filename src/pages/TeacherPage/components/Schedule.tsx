import React, {useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Flex } from '../../../components/Common'

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { ConvertScheduleToLocalTime } from '../../../utils/ConvertScheduleToLocalTime'

import { addDays } from '../../../utils/AddDaysToDate'
import { createPortal } from 'react-dom'
import BookLessonModal from '../../../components/Modal/BookLessonModal'
import { User, UserSchedule } from '../../../types/User/UserTypes'
const Wrapper = styled.div`
    width: 65%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 15px 30px;
    font-family: Inter;
    @media (max-width: 1028px) {
        width: 100%;
        padding: 15px 30px 150px 30px;
    }
    @media (max-width: 400px) {
        padding: 15px 12px 150px 12px;
    }
    h3 {
        color: #3c4447;
    }
`
const TimeZoneInfo = styled.div`
    width: 100%;
    min-height: 40px;
    font-size: 0.85rem;
    color: #3c4447;
    display: flex;
    align-items: center;
    justif-content: space-between;
    background: #f6f7f8;
    box-sizing: border-box;
    font-family: Inter;
    padding: 4px 10px;
    svg {
        font-size: 15px;
        margin-right: 10px;
    }
    margin: 20px 0px;
    @media (max-width: 400px) {
        font-size: 0.7rem;
    }
`
const Arrow = styled.button<{ isAvailable: boolean }>`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.isAvailable ? 'white' : '#f8f8f8')};
    color: #6f757b;
    font-size: 1.6rem;
    border: 1px solid #e3e5e6;
    &:hover {
        cursor: pointer;
        svg {
            color: ${(props) => props.isAvailable && '#26a5af'};
        }
    }
    @media (max-width: 400px) {
        width: 30px;
        height: 30px;
    }
`
const GLobalDate = styled.div`
    font-family: Inter;
    @media (max-width: 400px) {
        font-size: 14px;
    }
`
const ScheduleDay = styled.div`
    flex: 1 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    margin-top: 20px;

    &::before {
        content: '';
        display: block;
        width: 100%;
        margin-bottom: 5px;
        min-height: 4px;
        background: #26a5af;
    }
`
const ScheduleItem = styled.div`
    color: #3bb3bd;
    font-family: Inter;
    flex: 1 0;
    font-size: 1rem;
    padding: 7px;
    &:hover {
        cursor: pointer;
        border-radius: 10px;
        box-shadow: inset 0 0 0 1px #3bb3bd;
    }
    @media (max-width: 440px) {
        font-size: 13px;
    }
    @media (max-width: 330px) {
        font-size: 11px;
    }
`
const ShowMore = styled.div`
    display: inline-flex;
    justify-content: center;
    margin-top: 25px;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    color: #fff;
    background-color: #3bb3bd;
    padding: 10px 18px;
    border-radius: 15px;
    font-weight: 500;
    @media (max-width: 400px) {
        font-size: 12px;
        text-align: center;
    }
`
const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

type Props = {
    teacher: User | null
    schedule: UserSchedule[]
}
export const Schedule = ({ schedule,teacher}: Props) => {
    const [scheduleModal,setScheduleModal] = useState(false)
    const [dateInfo,setDateInfo] = useState()
    const [date] = useState(() => new Date())
    const [index, setIndex] = useState(0)
    const [scheduleWithOffset, setScheduleWithOffset] = useState<any>([])
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentDay, setCurrentDay] = useState<Date>(() => new Date())
    const [nextMonth, setNextMonth] = useState(0)
    const [nextDay, setNextDay] = useState(0)
    const [showFullSchedule, SetFullSchedule] = useState(false)
    useEffect(() => {
        //fix-move to utils maybe
        var today = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000 * index)
        let next = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)
        setCurrentMonth(today.getMonth())
        setCurrentDay(today)
        setNextMonth(next.getMonth())
        setNextDay(next.getDate())
    }, [index,date])
    useEffect(() => {
        if (scheduleWithOffset.length === 0) {
            setScheduleWithOffset(ConvertScheduleToLocalTime(schedule))
        }
    }, [scheduleWithOffset,schedule])

    function handleAprove(dateInfo:any) {
        setDateInfo(dateInfo)
      setScheduleModal(true)
    }

    return (
        <Wrapper>
             {scheduleModal &&
                createPortal(
                    <BookLessonModal
                        dateInfo={dateInfo}
                        avatarSrc={teacher!.photo}
                        setBookModal={setScheduleModal}
                        schedule={schedule}
                    />,
                    document.body
                )}
            <h3>Schedule</h3>
            <TimeZoneInfo>
                <div>
                    <AiOutlineQuestionCircle />
                </div>
                <span>
                    Select the time for the first lesson. The time is displayed
                    in your time zone.
                </span>
            </TimeZoneInfo>
            <div>
                <Flex align="center" gap="20px">
                    <Flex>
                        <Arrow
                            disabled={index - 1 === -1}
                            isAvailable={index - 1 !== -1}
                            onClick={() =>
                                index - 1 !== -1 && setIndex(index - 1)
                            }
                        >
                            <MdKeyboardArrowLeft />
                        </Arrow>
                        <Arrow
                            isAvailable={true}
                            onClick={() => setIndex(index + 1)}
                        >
                            <MdKeyboardArrowRight />
                        </Arrow>
                    </Flex>
                    <Flex>
                        <GLobalDate>
                            {Months[currentMonth]} {currentDay.getDate()}
                        </GLobalDate>
                        –
                        <GLobalDate>
                            {Months[nextMonth]} {nextDay}
                        </GLobalDate>
                    </Flex>
                </Flex>

                <Flex gap={'5px'}>
                    {scheduleWithOffset.map((day: any, index: number) => (
                        <ScheduleDay key={index}>
                            <Flex
                                gap={'10px'}
                                direction="column"
                                align="center"
                            >
                                <div>{day.name?.short}</div>
                                <div>{addDays(currentDay, index)}</div>
                            </Flex>
                            <div>
                                {day.time.map((el: any, timeIndex: number) =>
                                    el.isAvailable && showFullSchedule ? (
                                        <ScheduleItem
                                            key={timeIndex}
                                            onClick={() =>
                                                handleAprove({dayIndex:index,dayName:day.name.short,time:el.time})
                                            }
                                        >
                                            {el.time}
                                        </ScheduleItem>
                                    ) : (
                                        timeIndex < 5 && (
                                            <ScheduleItem
                                                key={timeIndex}
                                                onClick={() =>
                                                    handleAprove({dayIndex:index,dayName:day.name.short,time:el.time})
                                                }
                                            >
                                                {el.time}
                                            </ScheduleItem>
                                        )
                                    )
                                )}
                            </div>
                        </ScheduleDay>
                    ))}
                </Flex>
                <Flex justify="center">
                    <ShowMore
                        onClick={() => SetFullSchedule(!showFullSchedule)}
                    >
                        View full schedule
                    </ShowMore>
                </Flex>
            </div>
        </Wrapper>
    )
}

export default Schedule
