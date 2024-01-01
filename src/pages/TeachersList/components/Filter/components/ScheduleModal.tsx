import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '../../../../../components/Common'
import { BsSun } from 'react-icons/bs'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
import { FILTER_DAYS, FILTER_HOURS } from '../../../../../constants/data'
const Wrapper = styled.div`
    width: 120%;
    margin-left: -20%;
    min-width: 340px;
    background: white;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    border-radius: 15px;
    z-index: 3;
    left: 0;
    box-sizing: border-box;
    padding: 15px 15px 20px 15px;
    @media (max-width: 1080px) {
        margin-left: -40%;
    }
    @media (max-width: 960px) {
        margin-left: -70%;
    }
`
const TimeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const TimeItem = styled.div<{ full?: boolean; isChecked: boolean }>`
    width: 25%;
    height: ${(props) => (props.full ? '130px' : '110px')};
    border: 1px solid rgb(218, 223, 225);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    &:hover {
        svg {
            color: #3bb3bd;
        }
    }
    div {
        font-weight: 500;
        font-size: 1.05rem;
        margin-bottom: 3px;
        color: ${(props) => (props.isChecked ? '#3bb3bd' : 'black')};
    }
    span {
        text-align: center;
        color: ${(props) => (props.isChecked ? '#3bb3bd' : '#8a959e')};
        font-size: 0.9rem;
    }

    svg {
        font-size: 1.2rem;
        color: ${(props) => (props.isChecked ? '#3bb3bd' : 'black')};
    }
`
const DayContainer = styled.div`
    width: 100%;
    display: flex;
    height: 30px;
`
const DayItem = styled.div<{ isChecked: boolean }>`
    flex: 1;
    height: 100%;
    border: 1px solid rgb(218, 223, 225);
    display: flex;
    color: ${(props) => (props.isChecked ? '#3bb3bd' : '#090f19')};
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.9rem;
    &:hover {
        color: #3bb3bd;
    }
`

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
    choosenSchedule: string[]
    choosenDays: string[]
}

function ScheduleModal({ setFilters, choosenSchedule, choosenDays }: Props) {
    const [schedule, setSchedule] = useState(FILTER_HOURS)
    const [days, setDays] = useState(FILTER_DAYS)
    const [isDirty, setDirty] = useState(false)
    useEffect(() => {
        setSchedule(
            schedule.map((el) =>
                choosenSchedule.includes(el.time.hours)
                    ? { ...el, checked: true }
                    : { ...el, checked: false }
            )
        )
        setDays(
            days.map((el) =>
                choosenDays.includes(el.day.code)
                    ? { ...el, checked: true }
                    : { ...el, checked: false }
            )
        )
        setDirty(false)
    }, [choosenSchedule, choosenDays])

    useEffect(() => {
        if (isDirty) {
            const finalSchedule: string[] = []
            schedule.forEach((s) => {
                if (s.checked) {
                    finalSchedule.push(s.time.hours)
                }
            })
            const finalDays: string[] = []
            days.forEach((d) => {
                if (d.checked) {
                    finalDays.push(d.day.code)
                }
            })
            setFilters((prev) => ({
                ...prev,
                time: finalSchedule,
                days: finalDays,
            }))
        }
    }, [schedule, days])

    function dayClick(id: number) {
        setDays(
            days.map((el) =>
                el.id === id ? { ...el, checked: !el.checked } : { ...el }
            )
        )
        setDirty(true)
    }

    function handleClick(id: number) {
        setSchedule(
            schedule.map((el) =>
                el.id === id ? { ...el, checked: !el.checked } : { ...el }
            )
        )
        setDirty(true)
    }

    return (
        <Wrapper>
            <Text
                color="#090F19"
                fw={'500'}
                fz={'14px'}
                ff="Noto Sans"
                margin={'0px 0px 7px 0px'}
            >
                Time of day (in your time zone)
            </Text>
            <TimeContainer>
                {schedule.map((el) => (
                    <TimeItem
                        key={el.id}
                        onClick={() => handleClick(el.id)}
                        isChecked={el.checked}
                        full
                    >
                        <div>
                            <BsSun />
                        </div>
                        <div>{el.time.hours}</div>
                        <span>{el.time.part}</span>
                    </TimeItem>
                ))}
            </TimeContainer>
            <Text
                color="#090F19"
                fw={'500'}
                fz={'16px'}
                margin={'20px 0px 7px 0px'}
            >
                Days of the week
            </Text>
            <DayContainer>
                {days.map((d) => (
                    <DayItem
                        key={d.id}
                        onClick={() => dayClick(d.id)}
                        isChecked={d.checked}
                    >
                        {d.day.label}
                    </DayItem>
                ))}
            </DayContainer>
        </Wrapper>
    )
}

export default ScheduleModal
