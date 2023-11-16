import React, { useEffect, useRef, useState } from 'react'

import {
    Button,
    FavoriteContainer,
    FavoriteImage,
    Text,
    Text1,
    Title,
} from './style'
import { AiOutlineHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { GetFavoriteTeachers } from '../../redux/reducers/UserSlice'
import TeacherCard from '../TeachersList/components/TeacherCard'
import SideBar from '../TeachersList/components/SideBar'

import LikedImg from '../../assets/images/LikedTeachers.png'
import { ChangeTitle } from '../../utils/ChangeTitle'
import { Container } from '../TeachersList/style'
import PageLoader from '../../components/Loader/PageLoader'

type Props = {}
type ModalPosition = {
    top: number
    left: number
    isFirst: boolean
}
function FavoriteTeachers({}: Props) {
    const [width, setWidth] = useState(window.innerWidth)
    const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
        null
    )
    const [currentTeacher, setCurrentTeacher] = useState(0)
    const favoriteTeachers = useAppSelector(
        (state) => state.user.favoriteTeachers
    )
    const requestStatus = useAppSelector(
        (state) => state.user.favoriteTeachersStatus
    )
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(GetFavoriteTeachers('1'))
    }, [])

    let TeacherRef = useRef<HTMLInputElement[]>([])
    const addTeachertoRef = (el: HTMLInputElement) => {
        if (el && !TeacherRef.current.includes(el)) {
            TeacherRef.current.push(el)
        }
    }
    useEffect(() => {
        ChangeTitle('Japl | Favorite')
        function handleSet() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', () => handleSet())
        return () => {
            window.removeEventListener('resize', () => handleSet())
        }
    }, [])
    useEffect(() => {
        TeacherRef.current = []
        if (modalPosition) {
            hoverHandle(currentTeacher)
        }
    }, [width])
    function hoverHandle(teacherIndex: number) {
        let firstTeacherTopPosition =
            TeacherRef.current[0].getBoundingClientRect().top + window.scrollY
        setCurrentTeacher(teacherIndex)
        setModalPosition({
            top:
                TeacherRef.current[teacherIndex].getBoundingClientRect().top +
                window.scrollY -
                firstTeacherTopPosition,
            left: TeacherRef.current[teacherIndex].getBoundingClientRect()
                .width,
            isFirst: teacherIndex === 0,
        })
    }
    return (
        <div
            style={{
                background: '#edeff0',
                minHeight: window.innerHeight,
                paddingTop: '20px',
            }}
        >
            <Container>
                {requestStatus === 'done' ? (
                    favoriteTeachers.length ? (
                        <>
                            <Title>
                                Japanese: {favoriteTeachers.length} saved tutor
                            </Title>
                            <div style={{ position: 'relative' }}>
                                {favoriteTeachers.map((teacher, index) => (
                                    <>
                                        <TeacherCard
                                            key={teacher._id}
                                            isFirstCard={index === 0}
                                            addTeachertoRef={addTeachertoRef}
                                            teacher={teacher}
                                            hoverHandle={hoverHandle}
                                            index={index}
                                        />
                                        {modalPosition !== null && (
                                            <SideBar
                                                teacher={
                                                    favoriteTeachers![
                                                        currentTeacher
                                                    ]
                                                }
                                                modalPosition={modalPosition!}
                                                schedule={
                                                    favoriteTeachers![
                                                        currentTeacher
                                                    ].schedule
                                                }
                                            />
                                        )}
                                    </>
                                ))}
                            </div>
                        </>
                    ) : (
                        <FavoriteContainer>
                            <FavoriteImage>
                                <img src={LikedImg} />
                            </FavoriteImage>
                            <Text>
                                Save tutors by clicking on the{' '}
                                <AiOutlineHeart />
                            </Text>
                            <Text1>
                                Browse and save tutors on the Tutors page. This
                                is where you'll find your list of saved tutors.
                            </Text1>
                            <Button onClick={() => navigate('/teachers')}>
                                Watch tutors
                            </Button>
                        </FavoriteContainer>
                    )
                ) : (
                    <PageLoader />
                )}
            </Container>
        </div>
    )
}

export default FavoriteTeachers
