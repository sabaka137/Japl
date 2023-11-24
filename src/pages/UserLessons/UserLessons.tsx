import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import SettingsNavbar from '../../components/SettingsNavbar'
import LessonCard from './components/LessonCard'
import { Container, Flex } from '../../components/Common'
import {
    Button,
    LessonsContainer,
    LessonsImage,
    Test,
    Text,
    Text1,
} from './style'
import { useNavigate } from 'react-router-dom'
import { GetLessons } from '../../redux/reducers/UserSlice'
import EmptyLessonsList from '../../assets/images/lessonsEmpty.png'
import { ChangeTitle } from '../../utils/ChangeTitle'

function UserLessons() {
    const lessons = useAppSelector((state) => state.user.User?.lessons)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        ChangeTitle('Japl | Lessons')
        if (lessons == null) {
            dispatch(GetLessons())
        }
    }, [lessons, dispatch])
    return (
        <div style={{ background: '#edeff0', height: window.innerHeight }}>
            <SettingsNavbar />
            <Container
                style={{
                    minHeight: '400px',
                    marginTop: '30px',
                    boxSizing: 'border-box',
                    padding: '32px',
                }}
                w={50}
                m={'0 auto'}
            >
                {lessons?.length ? (
                    <Flex direction="column" gap={'15px'}>
                        {lessons?.map((lesson, index) => (
                            <LessonCard key={index} lesson={lesson} />
                        ))}
                    </Flex>
                ) : (
                    <LessonsContainer>
                        <LessonsImage>
                            <img
                                src={EmptyLessonsList}
                                alt="user has no upcoming lessons"
                            />
                        </LessonsImage>
                        <Test>
                            <Text>No lessons yet</Text>
                            <Text1>
                                As soon as you find a suitable tutor and and
                                book your first lesson, they will appear here.
                            </Text1>
                            <Button onClick={() => navigate('/teachers')}>
                                Find a tutor
                            </Button>
                        </Test>
                    </LessonsContainer>
                )}
            </Container>
        </div>
    )
}

export default UserLessons
