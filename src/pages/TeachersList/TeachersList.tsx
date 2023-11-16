import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { GetTeachersList } from '../../redux/reducers/TeachersSlice'

import SideBar from './components/SideBar'
import TeacherCard from './components/TeacherCard'
import { Container } from './style'
import { Text } from '../../components/Common'
import Filter from './components/Filter/Filter'
import { ChangeTitle } from '../../utils/ChangeTitle'
import SkeletonCard from './components/SkeletonCard'
type ModalPosition = {
    top: number
    left: number
    isFirst: boolean
}
function TeachersList() {
    const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
        null
    )
    const [width, setWidth] = useState(window.innerWidth)
    const [isReady, setReady] = useState(false)
    const [currentTeacher, setCurrentTeacher] = useState(0)
    const dispatch = useAppDispatch()
    const { teachersList, isLoad } = useAppSelector((state) => state.teachers)

    let TeacherRef = useRef<HTMLInputElement[]>([])
    const addTeachertoRef = (el: HTMLInputElement) => {
        if (el && !TeacherRef.current.includes(el)) {
            TeacherRef.current.push(el)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            if (isLoad) {
                setReady(true)
            }
        }, 500)
    }, [isLoad])
    useEffect(() => {
        function handleSet() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', () => handleSet())
        return () => {
            window.removeEventListener('resize', () => handleSet())
        }
    }, [])
    useEffect(() => {
        if (teachersList === null) {
            dispatch(
                GetTeachersList({
                    languages: null,
                    minPrice:1,
                    maxPrice:35,
                    countries: null,
                    time: null,
                    days: null,
                    isNative: false,
                    sortBy: null,
                    searchBy: null,
                })
            )
        }
    }, [dispatch])

    useEffect(() => {
        ChangeTitle('Japl | Tutor')
    }, [])
    useEffect(() => {
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
                background: '#f3f3f3',
                minHeight: window.innerHeight,

                padding: '40px 0px 200px 0px',
            }}
        >
            <Container>
                <Text fz={'2.3rem'} fw={'500'}>
                Japanese tutors online
                </Text>
            </Container>
            <Filter />
            <Container>
                <>
                    <Text
                        color="#090F19"
                        fz={'20px'}
                        margin={'0px 0px 20px 0px'}
                    >
                        {teachersList?.length} Japanese teachers with the right skills
                        
                    </Text>
                    <div style={{ position: 'relative' }}>
                        {isReady ? (
                            <>
                                {teachersList?.map((teacher, index) => (
                                    <TeacherCard
                                        key={index}
                                        isFirstCard={index === 0}
                                        addTeachertoRef={addTeachertoRef}
                                        teacher={teacher}
                                        hoverHandle={hoverHandle}
                                        index={index}
                                    />
                                ))}

                                {modalPosition !== null && (
                                    <SideBar
                                        teacher={teachersList![currentTeacher]}
                                        modalPosition={modalPosition}
                                        schedule={
                                            teachersList![currentTeacher]
                                                .schedule
                                        }
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        )}
                    </div>
                </>
            </Container>
        </div>
    )
}

export default TeachersList
