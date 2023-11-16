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

const CardWrapper = styled.div`
    width: 100%;
    height: 100px;
    border-radius: 15px;
    background: white;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 20px;
    justify-content: space-between;
`
const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 50px;
        height: 50px;
    }
`
const Button = styled.button`
    border: none;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 10px 35px;
    background: #e1fafa;
    color: #45909b;
    font-weight: 500;
`

type Props = {
    lesson: any
}

function LessonCard({ lesson }: Props) {
    const [teacher, setTeacher] = useState<User>()
    const [nextTime, setNextTime] = useState<any>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        let today = new Date(lesson.date)
        let temp = new Date(today.getTime() + 1 * 60 * 60 * 1000)
        let next = new Date(temp.getTime())

        setNextTime(
            next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        )
        dispatch(GetTeacher(lesson.teacherId)).then((res) => {
            setTeacher(res.payload.data)
        })
    }, [])

    function handleClick() {
        dispatch(setLesson(lesson))
        navigate(`/lesson/${lesson.teacherId}/${lesson.studentId}`)
    }
    return (
        <CardWrapper>
            <Flex gap={'15px'}>
                <Avatar>
                    <img src={teacher?.photo} />
                </Avatar>
                <div>
                    <Text fw={'500'} fz={'17px'}>
                        {days[new Date(lesson.date).getDay()]},{' '}
                        {months[new Date(lesson.date).getMonth()]}{' '}
                        {new Date(lesson.date).getDate()},{' '}
                        {new Date(lesson.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                        - {nextTime}
                    </Text>
                    <Text color="#707070" fw={'400'} fz={'1rem'}>
                        Japanese with {teacher?.name}
                    </Text>
                </div>
            </Flex>
            <Flex>
                <Button>
                    <AiOutlineCheck onClick={() => handleClick()} />
                    Подключится
                </Button>
            </Flex>
        </CardWrapper>
    )
}

export default LessonCard
