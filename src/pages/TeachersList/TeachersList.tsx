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
import { IFilter } from '../../types/Teachers/TeachersType'
import { COUNTRIES, LANGUAGES } from '../../constants/data'
import FiltersLoader from '../../components/Loader/FiltersLoader'
import PaginationPanel from './components/PaginationPanel'
import NothingFound from './nothing.png'
import EmptyList from './EmptyList'

type ModalPosition = {
    top: number
    left: number
    isFirst: boolean
}
function TeachersList() {
    const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
        null
    )
    const [filters, setFilters] = useState<IFilter>({
        languages: LANGUAGES,
        price: { min: 1, max: 50 },
        countries: COUNTRIES,
        time: [],
        days: [],
        isNative: false,
        sortBy: { label: 'Our recommendations', value: 'default' },
        currentPage: 1,
        searchBy: '',
    })

    const [width, setWidth] = useState(window.innerWidth)
    const [isReady, setReady] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentTeacher, setCurrentTeacher] = useState(0)
    const dispatch = useAppDispatch()
    const { teachersList, isLoad, teachersTotal, pagesTotal } = useAppSelector(
        (state) => state.teachers
    )

    const TeacherRef = useRef<HTMLInputElement[]>([])
    const addTeachertoRef = (el: HTMLInputElement) => {
        if (el && !TeacherRef.current.includes(el)) {
            TeacherRef.current.push(el)
        }
    }
    useEffect(() => {
        ChangeTitle('Japl | Tutor')
    }, [])
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
        const countriesFilter: string[] = []
        const languagesFilter: string[] = []
        filters.countries?.forEach((el) => {
            if (el.checked) {
                countriesFilter.push(el.country.code)
            }
        })
        filters.languages?.forEach((el) => {
            if (el.checked) {
                languagesFilter.push(el.language.code)
            }
        })
        TeacherRef.current = []
        setModalPosition(null)
        setCurrentTeacher(0)
        setCurrentPage(1)
        dispatch(
            GetTeachersList({
                languages:
                    languagesFilter.length === 0
                        ? null
                        : languagesFilter.join(','),
                minPrice: Number(filters.price.min),
                maxPrice: Number(filters.price.max),
                page: 1,
                countries:
                    countriesFilter.length === 0
                        ? null
                        : countriesFilter.join(','),
                time: filters.time.length === 0 ? null : filters.time.join(','),
                days: filters.days.length === 0 ? null : filters.days.join(','),
                isNative: filters.isNative,
                sort: filters.sortBy.value === '' ? null : filters.sortBy.value,
                search: filters.searchBy.length === 0 ? null : filters.searchBy,
            })
        )
    }, [filters])
    useEffect(() => {
        const countriesFilter: string[] = []
        const languagesFilter: string[] = []
        filters.countries?.forEach((el) => {
            if (el.checked) {
                countriesFilter.push(el.country.code)
            }
        })
        filters.languages?.forEach((el) => {
            if (el.checked) {
                languagesFilter.push(el.language.code)
            }
        })
        TeacherRef.current = []
        setModalPosition(null)
        setCurrentTeacher(0)
        dispatch(
            GetTeachersList({
                languages:
                    languagesFilter.length === 0
                        ? null
                        : languagesFilter.join(','),
                minPrice: Number(filters.price.min),
                maxPrice: Number(filters.price.max),
                page: currentPage,
                countries:
                    countriesFilter.length === 0
                        ? null
                        : countriesFilter.join(','),
                time: filters.time.length === 0 ? null : filters.time.join(','),
                days: filters.days.length === 0 ? null : filters.days.join(','),
                isNative: filters.isNative,
                sort: filters.sortBy.value === '' ? null : filters.sortBy.value,
                search: filters.searchBy.length === 0 ? null : filters.searchBy,
            })
        )
    }, [dispatch, currentPage])
    useEffect(() => {
        if (TeacherRef.current.length !== 0) {
            hoverHandle(0)
        }
    }, [filters, TeacherRef.current])
    useEffect(() => {
        if (TeacherRef.current.length !== 0) {
            hoverHandle(currentTeacher)
        }
    }, [width])

    function hoverHandle(teacherIndex: number) {
        const firstTeacherTopPosition =
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
                <Text fz={'2.3rem'} ff="Noto Sans" fw={'500'}>
                    Japanese tutors online
                </Text>
            </Container>
            <Filter filters={filters} setFilters={setFilters} />
            <Container>
                <>
                    <Text
                        color="#090F19"
                        fz={'19px'}
                        margin={'0px 0px 20px 0px'}
                        ff="Noto Sans"
                    >
                        {teachersTotal !== 0 && (
                            <span>
                                {teachersTotal} Japanese teachers with the right
                                skills
                            </span>
                        )}
                    </Text>

                    <div style={{ position: 'relative' }}>
                        {isReady ? (
                            <>
                                {teachersList?.length === 0 ? (
                                    <EmptyList />
                                ) : (
                                    <>
                                        {teachersList?.map((teacher, index) => (
                                            <TeacherCard
                                                key={index}
                                                isFirstCard={index === 0}
                                                addTeachertoRef={
                                                    addTeachertoRef
                                                }
                                                teacher={teacher}
                                                hoverHandle={hoverHandle}
                                                index={index}
                                            />
                                        ))}
                                        {modalPosition !== null && (
                                            <SideBar
                                                teacher={
                                                    teachersList![
                                                        currentTeacher
                                                    ]
                                                }
                                                modalPosition={modalPosition}
                                                schedule={
                                                    teachersList![
                                                        currentTeacher
                                                    ].schedule
                                                }
                                            />
                                        )}
                                    </>
                                )}

                                {!isLoad && <FiltersLoader />}
                            </>
                        ) : (
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        )}
                    </div>
                    {pagesTotal > 1 && (
                        <PaginationPanel
                            setFilters={setCurrentPage}
                            currentPage={currentPage || 1}
                            pagesTotal={pagesTotal}
                        />
                    )}
                </>
            </Container>
        </div>
    )
}

export default TeachersList
