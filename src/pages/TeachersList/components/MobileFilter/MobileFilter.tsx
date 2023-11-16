import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'
import { Flex, Text } from '../../../../components/Common'
import PriceRange from './components/PriceRange'
import NativeFilter from './components/NativeFilter'
import ScheduleFilter from './components/ScheduleFilter'
import CountryFilter from './components/CountryFilter'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import SortByFilter from './components/SortByFilter'
import { IFilter } from '../../../../types/Teachers/TeachersType'
import { LANGUAGES, COUNTRIES } from '../../../../constants/data'
import LanguageFilter from './components/LanguageFilter'
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 4;
    left: 0;
    top: 0;
    background: white;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0px 0px 50px 0px;
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
const ModalFooter = styled.div`
    width: 100%;
    height: 70px;
    border-top: 1px solid #dadfe1;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 16px;
`
const Button = styled.div`
    width: 100%;
    height: 45px;
    background: #0096b2;
    font-family: Inter;
    text-align: center;
    font-size: 0.9rem;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: #22a2be;
    }
`
const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    padding-bottom: 70px;
    box-sizing: border-box;
`
const FilterItem = styled.div`
    width: 100%;
    border-bottom: 1px solid #dadfe1;
    box-sizing: border-box;
    padding: 30px 0px;
`
const FilterDropDownItem = styled.div`
    width: 100%;
    border-bottom: 1px solid #dadfe1;
    box-sizing: border-box;
    padding: 20px 0px;
    cursor: pointer;
`
const FilterItemContent = styled.div`
    box-sizing: border-box;
    padding: 0px 20px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    input {
        display: none;
    }
    span {
        color: #384047;
        cursor: pointer;
        padding-left: 30px;
        position: relative;
        &:hover {
            &:before {
                content: '';
                position: absolute;
                left: 0px;
                top: 1px;
                width: 18px;
                height: 18px;
                border-radius: 2px;
                border: 1px solid #6cb1b4;
                background-color: rgb(255, 255, 255);
                transition: all 50ms ease;
            }
        }
        &:before {
            content: '';
            position: absolute;
            left: 0px;
            top: 1px;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            border: 1px solid rgb(218, 223, 225);
            background-color: rgb(255, 255, 255);
            transition: border-color 0s ease 0s, background-color 0s ease 0s,
                all 50ms ease 0s;
        }
    }
`
const Input = styled.input`
    border: 1px solid #dadfe1;
    border-radius: 2px;
    box-shadow: none;
    color: #384047;
    display: block;
    font-size: 14px;
    font-weight: 400;
    height: 38px;
    line-height: 1;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 0 12px;
    &:before {
        content: '1111';
        color: black;
        display: block;
    }
    &:focus {
        outline: none;
    }
    &:hover {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
    }
`

type Props = {
    setMobileModal: Dispatch<SetStateAction<boolean>>
}

function MobileFilter({ setMobileModal }: Props) {
    const [countyOpen, setCountyOpen] = useState<boolean>(false)
    const [speaksOpen, setSpeaksOpen] = useState<boolean>(false)
    const [filters, setFilters] = useState<IFilter>({
        languages: LANGUAGES,
        price: { min: 1, max: 35 },
        countries: COUNTRIES,
        time: [],
        days: [],
        isNative: false,
        sortBy: { label: 'Our recommendations', value: '' },
        searchBy: '',
    })
    console.log(filters)
    return (
        <Wrapper>
            <ModalHeader>
                <Text color="#33AAB4" fw="500" fz="16px">
                    Remove all
                </Text>

                <div onClick={() => setMobileModal(false)}>
                    <AiOutlineClose fontSize={'1.3rem'} color="#aeb5bc" />
                </div>
            </ModalHeader>
            <ModalContent>
                <FilterItem>
                    <FilterItemContent>
                        <Text
                            color="#090F19"
                            fz="19px"
                            margin="0px 0px 20px 0px"
                        >
                            PRICE PER LESSON
                        </Text>
                        <PriceRange
                            price={filters.price}
                            setFilters={setFilters}
                        />
                    </FilterItemContent>
                </FilterItem>
                <FilterItem>
                    <FilterItemContent>
                        <Text
                            color="#090F19"
                            fz="19px"
                            margin="0px 0px 25px 0px"
                        >
                            NATIVE SPEAKER
                        </Text>
                        <NativeFilter
                            isNative={filters.isNative}
                            setFilters={setFilters}
                        />
                    </FilterItemContent>
                </FilterItem>
                <FilterItem>
                    <FilterItemContent>
                        <Text
                            color="#090F19"
                            fz="19px"
                            margin="0px 0px 25px 0px"
                        >
                            TIME RANGE
                        </Text>
                        <ScheduleFilter
                            choosenDays={filters.days}
                            choosenSchedule={filters.time}
                            setFilters={setFilters}
                        />
                    </FilterItemContent>
                </FilterItem>
                <FilterDropDownItem onClick={() => setCountyOpen(!countyOpen)}>
                    <FilterItemContent>
                        <Flex align="center" justify="space-between">
                            <Text color="#090F19" fz="19px">
                                COUNTRY
                            </Text>
                            {countyOpen ? (
                                <IoIosArrowUp
                                    color="#3bb3bd"
                                    fontSize={'1.3rem'}
                                />
                            ) : (
                                <IoIosArrowDown
                                    color="#3bb3bd"
                                    fontSize={'1.3rem'}
                                />
                            )}
                        </Flex>
                        {countyOpen && (
                            <CountryFilter
                                countries={filters.countries}
                                setFilters={setFilters}
                            />
                        )}
                    </FilterItemContent>
                </FilterDropDownItem>
                <FilterDropDownItem onClick={() => setSpeaksOpen(!speaksOpen)}>
                    <FilterItemContent>
                        <Flex align="center" justify="space-between">
                            <Text color="#090F19" fz="19px">
                                SPEAKS AT
                            </Text>
                            {speaksOpen ? (
                                <IoIosArrowUp
                                    color="#3bb3bd"
                                    fontSize={'1.3rem'}
                                />
                            ) : (
                                <IoIosArrowDown
                                    color="#3bb3bd"
                                    fontSize={'1.3rem'}
                                />
                            )}
                        </Flex>
                        {speaksOpen && (
                            <LanguageFilter
                                languages={filters.languages}
                                setFilters={setFilters}
                            />
                        )}
                    </FilterItemContent>
                </FilterDropDownItem>
                <FilterItem>
                    <FilterItemContent>
                        <Text
                            color="#090F19"
                            fz="19px"
                            margin="0px 0px 25px 0px"
                        >
                            SORT BY: OUR RECOMMENDATIONS
                        </Text>
                        <SortByFilter
                            setFilters={setFilters}
                            currentSort={filters.sortBy}
                        />
                    </FilterItemContent>
                </FilterItem>
            </ModalContent>
            <ModalFooter>
                <Button>Apply filters</Button>
            </ModalFooter>
        </Wrapper>
    )
}

export default MobileFilter
