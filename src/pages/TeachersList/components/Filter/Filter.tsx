import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosClose, IoMdArrowDropdown } from 'react-icons/io'
import styled from 'styled-components'
import { Flex, Text } from '../../../../components/Common'
import PriceRangeModal from './components/PriceRangeModal'
import ContryModal from './components/ContryModal'
import ScheduleModal from './components/ScheduleModal'
import { TbListSearch } from 'react-icons/tb'
import FilterModal from '../MobileFilter/MobileFilter'
import { Container } from '../../style'
import { IFilter } from '../../../../types/Teachers/TeachersType'
import LanguageModal from './components/LanguageModal'
import NativeModal from './components/NativeModal'
import SortByFilter from '../MobileFilter/components/SortByFilter'
import SortModal from './components/SortModal'
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiOutlineSearch,
} from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import { LANGUAGES, COUNTRIES } from '../../../../constants/data'
import { useAppDispatch } from '../../../../hooks/hook'
import { GetTeachersList } from '../../../../redux/reducers/TeachersSlice'
const Wrapper = styled.div<{ isWrapperFixed: boolean }>`
    width: 100%;
    margin-bottom: 20px;
    position: ${(props) => (props.isWrapperFixed ? 'sticky' : 'auto')};
    top: 0;
    z-index: 22;
    box-sizing: border-box;
    border-radius: 0 0 16px 16px;
    padding: 16px 32px 24px 32px;
    background: ${(props) => (props.isWrapperFixed ? '#192435' : '#f3f3f3')};
    transition: background-color 0.2s;
`

const ContentDesktop = styled.div<{ isWrapperFixed: boolean }>`
    position: relative;
    @media (max-width: 780px) {
        display: none;
    }
    &:after {
        background: transparent
            url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNTEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQuMzg4IDQ0LjEwOGMyLjQyMiAzLjg4NSA2LjAyMyA2LjU1MSAxMC45NDEgNi42ODMgNC4zOTcuMTE4IDguNTYxLTIuMjAyIDExLjY3MS01LjI5NiAxLjQ1Ni0xLjQ0OCAyLjc2LTMuMTI2IDMuMzQ1LTUuMDkzLjUyNS0xLjc2NS40NC0zLjY0Ni42MjMtNS40NzhhMTguNzUzIDE4Ljc1MyAwIDAgMSA0LjEzMi05Ljk2YzEuODQyLTIuMjQ2IDQuMTgzLTQuMDM0IDYuMTEtNi4yMDYgMS45MjgtMi4xNzMgMy40NzgtNC45NDIgMy4yMDktNy44MzUtLjE5NC0yLjA4LTEuMzItMy45OS0yLjc4My01LjQ4Ni0zLjUzLTMuNjEtOC45MzgtNC45NS0xMy45NTctNC40MjUtNS4wMi41MjctOS43MTYgMi43MTctMTQuMDI4IDUuMzIzQzkuNDg4IDguODUgNS40NTggMTEuOTIgMy4xNDUgMTYuMTktLjU4NyAyMy4wNzktLjU3MiAzNi4xNSA0LjM4OCA0NC4xMDhaIiBmaWxsPSIjRkVDOTZFIi8+PC9zdmc+)
            0 0 no-repeat;
        content: '';
        height: 50px;
        left: -45px;
        opacity: ${(props) => (props.isWrapperFixed ? '1' : '0')};
        position: absolute;
        top: -15px;
        width: 50px;
        z-index: 20;
    }
    &:before {
        background: transparent
            url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LjcxNCA0LjU4M2M5LjUyOCAxMC41OCAxNi41IDIyLjI2NyAxNi41MSAzOC4yMjhNMjQuNDkyIDYuODIyYzYuNjk2IDguMDYgMTEuMDcgMTYuNTQ0IDEyLjI5MyAyOS4wMTYiIHN0cm9rZT0iIzUyRDVERiIgc3Ryb2tlLXdpZHRoPSIyLjIzOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)
            0 0 no-repeat;
        content: '';
        height: 50px;
        width: 50px;
        opacity: ${(props) => (props.isWrapperFixed ? '1' : '0')};
        position: absolute;
        right: -30px;
        top: -15px;
        z-index: 20;
    }
`
const ContentMobile = styled.div`
    display: none;
    width: 100%;
    height: 45px;
    background: white;
    border: 1px solid #e3e5e6;
    align-items: center;
    box-sizing: border-box;
    gap: 10px;
    padding: 0px 15px;
    &:hover {
        cursor: pointer;
        div {
            color: #6cc6ce;
        }
        box-shadow: 0 0 7px rgba(0, 0, 0, 0.12);
    }
    @media (max-width: 780px) {
        display: flex;
    }
`

const TopBar = styled.div`
    width: 100%;
    height: 65px;
    background: #fff;
    border-radius: 15px;
    display: flex;
    margin-bottom: 10px;
`
const BottomBar = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    justify-content: space-between;
`
const SelectItem = styled.div`
    flex: 1;
    max-width: 25%;

    height: 100%;
    box-sizing: border-box;
    padding: 12px 16px 8px;
    border-radius: 15px;
    position: relative;
    background: white;
    z-index: 1;
    &:last-child {
        &:after {
            content: '';
            display: none;
        }
    }
    &:after {
        content: '';
        display: block;
        height: 30px;
        width: 1px;
        background: #dadfe1;
        position: absolute;
        right: 0;
        top: calc(50% - 15px);
    }
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 7px rgba(0, 0, 0, 0.12);
    }
`

const ItemType = styled.div`
    color: #8a959e;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 11px;
    margin-bottom: 3px;
    letter-spacing: 0.75px;

    line-height: 1.63636364;
`
const ItemValue = styled.div`
    color: #090f19;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Noto Sans;
    font-size: 15px;
`
const ValueText = styled.div`
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Noto Sans;
    font-size: 15px;
`
const ValueContent = styled.div`
    display: flex;
    align-items: center;
    max-width: 100%;
    overflow: hidden;
    font-weight: 500;
    font-family: Noto Sans;
`
const ItemIcon = styled.div`
    display: flex;
    align-items: center;
    svg {
        font-size: 1.2rem;
        color: #6f757b;
    }
`
const BottomBarItem = styled.div`
    background-color: #fff;
    border-radius: 12px;
    padding: 10px 16px;
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    color: #090f19;
    font-weight: 500;
    font-size: 14px;
    font-family: Noto Sans;
    gap: 7px;

    &:hover {
        box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
        cursor: pointer;
    }
`

const BottomSearch = styled(BottomBarItem)`
    padding: 0px 0px 0px 12px;
    min-height: 40px;
`

const BottomBarInput = styled.input`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
`
const InputWrapper = styled.div`
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
`

const InputConfirmButton = styled.div`
    height: 100%;
    width: 65px;
    display: flex;
    justify-content: center;
    font-size: 19px;
    align-items: center;
    border-radius: 7px 12px 12px 7px;
    height: 100%;
    &:hover {
        background: rgba(18, 17, 23, 0.06);
    }
`

const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
`
type Props = {
    filters: IFilter
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
}
function Filter({ filters, setFilters }: Props) {
    const [currentModal, setCurrentModal] = useState<any>(null)
    const [currentModalRef, setCurrentModalRef] = useState<any>(null)
    const [mobileModal, setMobileModal] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [isWrapperFixed, setWrapperFixed] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        const listener = () => {
            if (WrapperRef.current!.getBoundingClientRect().top < 20) {
                if (!isWrapperFixed) {
                    setWrapperFixed(true)
                }
            }
            if (
                document.body!.getBoundingClientRect().top >
                -(
                    WrapperRef.current!.getBoundingClientRect().top -
                    document.body!.getBoundingClientRect().top
                )
            ) {
                setWrapperFixed(false)
            }
        }
        window.addEventListener('scroll', listener)
        return () => {
            window.removeEventListener('scroll', listener)
        }
    }, [])
    useEffect(() => {
        if (window.innerWidth < 780) {
            setMobileModal(false)
        }
    }, [window.innerWidth])
    function openModal(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        modalType: string
    ) {
        if (modalType === 'searchBy') {
            inputRef.current?.focus()
        }
        event.preventDefault()
        setCurrentModal(modalType)
        setCurrentModalRef(event.currentTarget)
        event.currentTarget.style.zIndex = '3'
    }
    function closeModal() {
        if (currentModal === 'searchBy' && searchValue === '') {
            submitSearchFilter()
        }
        setCurrentModal(null)
        currentModalRef.style.zIndex = '1'
    }
    function enterPress(key: string) {
        if (key === 'Enter') {
            submitSearchFilter()
        }
    }
    function clearSpecificFilter(type: 'country' | 'schedule' | 'language') {
        if (type === 'country') {
            setFilters((prev) => ({
                ...prev,
                countries: filters.countries.map((c) => ({
                    ...c,
                    checked: false,
                })),
            }))
        }
        if (type === 'schedule') {
            setFilters((prev) => ({
                ...prev,
                time: [],
                days: [],
            }))
        }
        if (type === 'language') {
            setFilters((prev) => ({
                ...prev,
                languages: filters.languages.map((l) => ({
                    ...l,
                    checked: false,
                })),
            }))
        }
    }

    function submitSearchFilter() {
        setFilters((prev) => ({
            ...prev,
            searchBy: searchValue,
        }))
        setCurrentModal(null)
        inputRef.current?.blur()
    }
    const WrapperRef = useRef<HTMLDivElement | null>(null)

    return (
        <Wrapper ref={WrapperRef} isWrapperFixed={isWrapperFixed}>
            <Container>
                <ContentDesktop isWrapperFixed={isWrapperFixed}>
                    <TopBar>
                        <SelectItem onClick={(e) => openModal(e, 'speaksOn')}>
                            <ItemType>Speaks at</ItemType>
                            <ItemValue>
                                <ValueContent>
                                    <ValueText>
                                        {filters.languages?.filter(
                                            (el) => el.checked
                                        ).length === 0 ? (
                                            <span>Any language</span>
                                        ) : (
                                            filters.languages?.map(
                                                (l, index) =>
                                                    l.checked && (
                                                        <span key={index}>
                                                            {l.language.label},
                                                        </span>
                                                    )
                                            )
                                        )}
                                    </ValueText>
                                    {filters.languages?.filter(
                                        (el) => el.checked
                                    ).length !== 0 && (
                                        <AiFillCloseCircle
                                            onClick={(e) => (
                                                e.stopPropagation(),
                                                clearSpecificFilter('language')
                                            )}
                                            fontSize={'23px'}
                                            color="#121117"
                                        />
                                    )}
                                </ValueContent>
                                <ItemIcon>
                                    <IoMdArrowDropdown />
                                </ItemIcon>
                            </ItemValue>
                            {currentModal === 'speaksOn' && (
                                <LanguageModal
                                    languages={filters.languages}
                                    setFilters={setFilters}
                                />
                            )}
                        </SelectItem>
                        <SelectItem onClick={(e) => openModal(e, 'price')}>
                            <ItemType>Price per lesson</ItemType>
                            <ItemValue>
                                <div>
                                    {filters.price.min}$-{filters.price.max}$
                                </div>
                                <ItemIcon>
                                    <IoMdArrowDropdown />
                                </ItemIcon>
                            </ItemValue>
                            {currentModal === 'price' && (
                                <PriceRangeModal
                                    price={filters.price}
                                    setFilters={setFilters}
                                ></PriceRangeModal>
                            )}
                        </SelectItem>
                        <SelectItem onClick={(e) => openModal(e, 'country')}>
                            <ItemType>Country</ItemType>
                            <ItemValue>
                                <ValueContent>
                                    <ValueText>
                                        {filters.countries?.filter(
                                            (el) => el.checked
                                        ).length === 0 ? (
                                            <span>Any country</span>
                                        ) : (
                                            filters.countries?.map(
                                                (c, index) =>
                                                    c.checked && (
                                                        <span key={index}>
                                                            {c.country.label},
                                                        </span>
                                                    )
                                            )
                                        )}
                                    </ValueText>
                                    {filters.countries?.filter(
                                        (el) => el.checked
                                    ).length !== 0 && (
                                        <AiFillCloseCircle
                                            onClick={(e) => (
                                                e.stopPropagation(),
                                                clearSpecificFilter('country')
                                            )}
                                            fontSize={'23px'}
                                            color="#121117"
                                        />
                                    )}
                                </ValueContent>
                                <ItemIcon>
                                    <IoMdArrowDropdown />
                                </ItemIcon>
                            </ItemValue>
                            {currentModal === 'country' && (
                                <ContryModal
                                    countries={filters.countries}
                                    setFilters={setFilters}
                                />
                            )}
                        </SelectItem>
                        <SelectItem onClick={(e) => openModal(e, 'time')}>
                            <ItemType>Time range</ItemType>
                            <ItemValue>
                                <ValueContent>
                                    {filters.days?.length === 0 &&
                                    filters.time?.length === 0 ? (
                                        'Any time'
                                    ) : (
                                        <>
                                            <ValueText>
                                                {filters.time?.map((t) => (
                                                    <span key={t}>{t},</span>
                                                ))}
                                                {filters.days?.map((d) => (
                                                    <span key={d}>{d},</span>
                                                ))}
                                            </ValueText>
                                            <AiFillCloseCircle
                                                onClick={(e) => (
                                                    e.stopPropagation(),
                                                    clearSpecificFilter(
                                                        'schedule'
                                                    )
                                                )}
                                                fontSize={'23px'}
                                                color="#121117"
                                            />
                                        </>
                                    )}
                                </ValueContent>
                                <ItemIcon>
                                    <IoMdArrowDropdown />
                                </ItemIcon>
                            </ItemValue>
                            {currentModal === 'time' && (
                                <ScheduleModal
                                    choosenDays={filters.days}
                                    choosenSchedule={filters.time}
                                    setFilters={setFilters}
                                />
                            )}
                        </SelectItem>
                    </TopBar>
                    <BottomBar>
                        <Flex gap={'10px'}>
                            <BottomBarItem
                                onClick={(e) => openModal(e, 'isNative')}
                            >
                                <div>Native speaker</div>
                                {filters.isNative && (
                                    <AiFillCheckCircle fontSize={'22px'} />
                                )}
                                <ItemIcon>
                                    <IoIosArrowDown />
                                </ItemIcon>
                                {currentModal === 'isNative' && (
                                    <NativeModal
                                        isNative={filters.isNative}
                                        setFilters={setFilters}
                                    />
                                )}
                            </BottomBarItem>
                        </Flex>
                        <Flex gap={'10px'}>
                            <BottomBarItem
                                onClick={(e) => openModal(e, 'sortBy')}
                            >
                                <div>Sort by: {filters.sortBy.label}</div>
                                <IoIosArrowDown />
                                {currentModal === 'sortBy' && (
                                    <SortModal
                                        setFilters={setFilters}
                                        currentSort={filters.sortBy}
                                    />
                                )}
                            </BottomBarItem>
                            <BottomSearch
                                onClick={(e) => openModal(e, 'searchBy')}
                            >
                                <AiOutlineSearch fontSize={18} />
                                <InputWrapper>
                                    <BottomBarInput
                                        onKeyDown={(e) => enterPress(e.key)}
                                        ref={inputRef}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                        placeholder="Search for a name or word"
                                    />
                                    {searchValue.length !== 0 && (
                                        <InputConfirmButton
                                            onClick={(e) => (
                                                e.stopPropagation(),
                                                submitSearchFilter()
                                            )}
                                        >
                                            <BsArrowRight />
                                        </InputConfirmButton>
                                    )}
                                </InputWrapper>
                            </BottomSearch>
                        </Flex>
                    </BottomBar>
                </ContentDesktop>
                <ContentMobile onClick={() => setMobileModal(true)}>
                    <TbListSearch color="#6cc6ce" fontSize={'1.6rem'} />{' '}
                    <Text inline fz="16px" fw="500">
                        Filters
                    </Text>
                </ContentMobile>
                {mobileModal && (
                    <FilterModal
                        filters={filters}
                        setFilters={setFilters}
                        setMobileModal={setMobileModal}
                    />
                )}
                {currentModal !== null && (
                    <ModalWrapper onClick={(e) => closeModal()} />
                )}
            </Container>
        </Wrapper>
    )
}

export default Filter
