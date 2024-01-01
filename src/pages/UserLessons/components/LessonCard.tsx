import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/hook'
import { setLesson } from '../../../redux/reducers/LessonSlice'
import styled from 'styled-components'
import { Flex, Text } from '../../../components/Common'
import { GetTeacher } from '../../../redux/reducers/TeachersSlice'
import { User } from '../../../types/User/UserTypes'
import { AiOutlineCheck } from 'react-icons/ai'
import { days, months } from './data'
import { Lesson } from '../../../types/Lesson/LessonsType'

const CardWrapper = styled.div`
    width: 100%;
    min-height: 100px;
    border-radius: 15px;
    background: white;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 20px;

    justify-content: space-between;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`
const Avatar = styled.div`
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 50px;
        height: 50px;
    }
`
const DateText = styled.div`
    font-weight: 500;
    font-size: 17px;
    font-family: Inter;
    @media (max-width: 600px) {
        font-size: 14px;
    }
`

const Button = styled.button`
    border: none;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 10px 30px;
    background: #e1fafa;
    color: #45909b;
    font-weight: 500;
    @media (max-width: 600px) {
        width: 100%;
        justify-content: center;
        margin-top: 10px;
    }
`

type Props = {
    lesson: Lesson
}

function LessonCard({ lesson }: Props) {
    const [teacher, setTeacher] = useState<User>()
    const [nextTime, setNextTime] = useState<any>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const today = new Date(lesson.date)
        const temp = new Date(today.getTime() + 1 * 60 * 60 * 1000)
        const next = new Date(temp.getTime())

        setNextTime(
            next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        )
        dispatch(GetTeacher(lesson.teacherId)).then((res) => {
            setTeacher(res.payload.data)
        })
    }, [])

    function handleClick() {
        //dispatch(setLesson(lesson))
        //navigate(`/lesson/${lesson.teacherId}/${lesson.studentId}`)
    }
    return (
        <CardWrapper>
            <Flex gap={'15px'}>
                <Avatar>
                    <img src={teacher?.photo} />
                </Avatar>
                <Flex justify="center" direction="column">
                    <DateText>
                        {days[new Date(lesson.date).getDay()]},{' '}
                        {months[new Date(lesson.date).getMonth()]}{' '}
                        {new Date(lesson.date).getDate()},{' '}
                        {new Date(lesson.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                        - {nextTime}
                    </DateText>
                    <Text color="#707070" fw={'400'} fz={'1rem'}>
                        Japanese with {teacher?.name}
                    </Text>
                </Flex>
            </Flex>

            <Button>
                <AiOutlineCheck onClick={() => handleClick()} />
                Подключится
            </Button>
        </CardWrapper>
    )
}

export default LessonCard
