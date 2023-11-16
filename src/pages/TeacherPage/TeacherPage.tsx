import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { GetTeacher } from '../../redux/reducers/TeachersSlice'
import { useParams } from 'react-router-dom'

import { Header, TeacherContainer, TeacherContent } from './style'
import { TeacherHeader } from './components/TeacherHeader'
import { Description } from './components/Description'
import Schedule from './components/Schedule'
import Sidebar from './components/Sidebar'
import { Box } from '../../components/Common'
import BottomPanel from './components/BottomPanel'
import PageLoader from '../../components/Loader/PageLoader'

function TeacherPage() {
    const { currentTeacher, isTeacheLoad } = useAppSelector(
        (state) => state.teachers
    )
    const { id } = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(GetTeacher(id!))
    }, [])

    return (
        <div>
            {isTeacheLoad ? (
                <div>
                    <Header>
                        <TeacherContainer>
                            <TeacherHeader currentTeacher={currentTeacher} />
                            <Sidebar
                                schedule={currentTeacher!.schedule}
                                teacher={currentTeacher}
                            />
                        </TeacherContainer>
                    </Header>
                    <Box bg="#edeff0" padding="20px 0px" borderBox>
                        <TeacherContent>
                            <Description
                                teacherDescription={currentTeacher!.description}
                            />
                        </TeacherContent>
                        <TeacherContent>
                            <Schedule schedule={currentTeacher?.schedule} />
                        </TeacherContent>
                    </Box>
                    <BottomPanel
                        schedule={currentTeacher!.schedule}
                        teacher={currentTeacher}
                    />
                </div>
            ) : (
                <PageLoader/>
            )}
        </div>
    )
}

export default TeacherPage
