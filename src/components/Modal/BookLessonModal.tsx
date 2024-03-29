import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ConvertScheduleToLocalTime } from '../../utils/ConvertScheduleToLocalTime'
import { Flex, Text } from '../Common'
import { UserSchedule } from '../../types/User/UserTypes'
import { AiOutlineClose } from 'react-icons/ai'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { addDays } from '../../utils/AddDaysToDate'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { SetLessons, setLessonsLocal } from '../../redux/reducers/UserSlice'
import { setLoad } from '../../redux/reducers/SearchSlice'
import { ButtonLoader } from '../Loader/ButtonLoader'
const ModalWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
    background: rgba(56, 64, 71, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalItem = styled.div`
    background: white;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 520px;
    @media (max-width: 640px) {
        width: 100%;
        height: 100%;
    }
`
const ModalHeader = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #dadfe1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 16px;
`
const ModalContent = styled.div`
    min-height: 400px;
    flex: 2;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 16px 24px 32px;
`
const ModalFooter = styled.div`
    width: 100%;
    min-height: 80px;
    border-top: 1px solid #dadfe1;
    background: #f8f8f8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
    padding: 0px 16px;
    @media (max-width: 640px) {
        flex-direction: column;
        justify-content: center;
        padding: 10px 16px;
        border-top: none;
        gap: 10px;
        button {
            order: 1;
            min-width: 100%;
        }
        div {
            order: 2;
        }
    }
`
const Button = styled.button<{ timePicked: boolean }>`
    background: ${(props) => (props.timePicked ? '#3bb3bd' : '#e9ebeb')};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    box-sizing: border-box;
    width: 140px;
    height: 40px;
    color: ${(props) => (props.timePicked ? 'white' : '#6f757b')};
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: ${(props) => (props.timePicked ? '#41bac4' : '#e9ebeb')};
    }
`
const ScheduleDay = styled.div`
    display: flex;
    flex: 1 0;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    &::before {
        content: '';
        display: block;
        width: 100%;
        min-height: 4px;
        background: #26a5af;
    }
    @media (max-width: 480px) {
        font-size: 13px;
    }
`
const ScheduleItem = styled.div<{ choosen?: boolean }>`
    color: #3bb3bd;
    font-family: Inter;
    font-size: 1rem;
    border-radius: 8px;
    box-shadow: ${(props) => props.choosen && 'inset 0 0 0 1px #3bb3bd'};
    padding: 5px;
    &:hover {
        cursor: pointer;

        box-shadow: inset 0 0 0 1px #3bb3bd;
    }
    @media (max-width: 480px) {
        font-size: 13px;
    }
    @media (max-width: 380px) {
        font-size: 11px;
    }
`
const CloseButton = styled.div`
    &:hover {
        cursor: pointer;
    }
`
const Avatar = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 35px;
        height: 35px;
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
`
const GLobalDate = styled.div`
    font-family: Inter;
    @media (max-width: 640px) {
        font-size: 14px;
    }
`
type Props = {
    schedule: UserSchedule[]
    setBookModal: Dispatch<SetStateAction<boolean>>
    avatarSrc: string
    dateInfo?: { dayIndex: number; dayName: string; time: string }
    teacherId: string
    setSuccessfullLesson: React.Dispatch<React.SetStateAction<boolean>>
}
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
//fix-rerender on change date
function BookLessonModal({
    schedule,
    setBookModal,
    avatarSrc,
    dateInfo,
    teacherId,
    setSuccessfullLesson,
}: Props) {
    const [scheduleWithOffset, setScheduleWithOffset] = useState<
        UserSchedule[] | []
    >([])
    const [pickedTime, setPickedTime] = useState<Date | null>(null)
    const [lessonLoaded, seLoaded] = useState(true)
    const [date] = useState(() => new Date())
    const [index, setIndex] = useState(0)
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentDay, setCurrentDay] = useState<Date>(() => new Date())
    const [nextMonth, setNextMonth] = useState(0)
    const [nextDay, setNextDay] = useState(0)
    const tz = Intl.DateTimeFormat().resolvedOptions()
    const dispatch = useAppDispatch()
    const { User } = useAppSelector((state) => state.user)
    useEffect(() => {
        if (scheduleWithOffset.length === 0) {
            setScheduleWithOffset(
                ConvertScheduleToLocalTime(schedule, dateInfo)
            )
            if (dateInfo) {
                handlePick(dateInfo.dayIndex, dateInfo.time, dateInfo.dayName)
            }
        }
    }, [scheduleWithOffset])
    useEffect(() => {
        //fix-move to utils mb
        const today = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000 * index)
        const next = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)
        setCurrentMonth(today.getMonth())
        setCurrentDay(today)
        setNextMonth(next.getMonth())
        setNextDay(next.getDate())
    }, [index])
    function handlePick(dayIndex: number, hour: string, dayName: string) {
        const temp = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000 * index)
        const gmt = new Date().getTimezoneOffset() / 60
        const hours = Number(hour.split(':')[0])
        const minutes = hour.split(':')[1]
        const localTime = new Date(
            temp.getFullYear(),
            temp.getMonth(),
            temp.getDate() + dayIndex,
            hours - gmt * 2,
            Number(minutes)
        )
        setScheduleWithOffset((prev: UserSchedule[]) =>
            prev.map((day) =>
                day.name.short === dayName
                    ? {
                          ...day,
                          time: day.time.map((t) =>
                              t.time === hour
                                  ? { ...t, choosen: true }
                                  : { ...t, choosen: false }
                          ),
                      }
                    : {
                          ...day,
                          time: day.time.map((t) => ({
                              ...t,
                              choosen: false,
                          })),
                      }
            )
        )
        setPickedTime(localTime)
    }
    function aproveTime() {
        seLoaded(false)

        dispatch(
            SetLessons({
                teacherId: teacherId,
                studentId: User!._id,
                date: pickedTime!,
                dayIndex: index,
            })
        ).then((res) => {
            seLoaded(true)
            setSuccessfullLesson(true)
            setBookModal(false)
            dispatch(
                setLessonsLocal({
                    teacherId: teacherId,
                    studentId: User!._id,
                    date: pickedTime!,
                    dayIndex: index,
                })
            )
        })
    }
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        setBookModal(false)
        e.stopPropagation()
    }
    return (
        <ModalWrapper onClick={(e) => handleClick(e)}>
            <ModalItem onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Flex align="center" gap="10px">
                        <Avatar>
                            <img src={avatarSrc} alt="tutor-avatar" />
                        </Avatar>
                        <Text color="#384047" fw="500" fz="17px">
                            Book a 50-minute trial lesson
                        </Text>
                    </Flex>
                    <div onClick={() => setBookModal(false)}>
                        <CloseButton>
                            {' '}
                            <AiOutlineClose
                                fontSize={'1.3rem'}
                                color="#aeb5bc"
                            />
                        </CloseButton>
                    </div>
                </ModalHeader>
                <ModalContent>
                    <Flex align="center">
                        <Flex
                            justify="space-between"
                            align="center"
                            style={{ width: '100%' }}
                        >
                            <Arrow
                                disabled={index - 1 === -1}
                                isAvailable={index - 1 !== -1}
                                onClick={() =>
                                    index - 1 !== -1 && setIndex(index - 1)
                                }
                            >
                                <MdKeyboardArrowLeft />
                            </Arrow>
                            <Flex align="center" gap="3px">
                                <GLobalDate>
                                    {Months[currentMonth]}{' '}
                                    {currentDay.getDate()}
                                </GLobalDate>
                                —
                                <GLobalDate>
                                    {Months[nextMonth]} {nextDay}
                                </GLobalDate>
                            </Flex>
                            <Arrow
                                isAvailable={true}
                                onClick={() => setIndex(index + 1)}
                            >
                                <MdKeyboardArrowRight />
                            </Arrow>
                        </Flex>
                    </Flex>
                    <Flex
                        gap="5px"
                        style={{ height: '200px', maxWidth: '100%' }}
                    >
                        {scheduleWithOffset.map(
                            (day: UserSchedule, index: number) => (
                                <ScheduleDay key={index}>
                                    <div
                                        style={{
                                            margin: '10px 0px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            flex: '1 0',
                                        }}
                                    >
                                        <div>{day.name?.short}</div>
                                        <div>{addDays(currentDay, index)}</div>
                                    </div>
                                    <div style={{ flex: '1 0' }}>
                                        {day.time.map(
                                            (el, timeIndex: number) =>
                                                el.isAvailable && (
                                                    <ScheduleItem
                                                        choosen={el.choosen}
                                                        key={timeIndex}
                                                        onClick={() =>
                                                            handlePick(
                                                                index,
                                                                el.time,
                                                                day.name.short
                                                            )
                                                        }
                                                    >
                                                        {el.time}
                                                    </ScheduleItem>
                                                )
                                        )}
                                    </div>
                                </ScheduleDay>
                            )
                        )}
                    </Flex>
                </ModalContent>
                <ModalFooter>
                    <Text color="#6f757b" fz="15px" align="center">
                        Displayed in your time zone: {tz.timeZone}
                    </Text>
                    <Button
                        onClick={() => aproveTime()}
                        timePicked={pickedTime !== null}
                    >
                        {lessonLoaded ? 'Confirm' : <ButtonLoader />}
                    </Button>
                </ModalFooter>
            </ModalItem>
        </ModalWrapper>
    )
}

export default BookLessonModal
