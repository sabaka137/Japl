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
import { DEFAULT_FILTERS } from '../../../../constants/filters'
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 22;
    left: 0;
    top: 0;
    background: white;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0px 0px 50px 0px;
`
const CloseButton = styled.div`
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #aeb5bc;
    }
`
const RemoveFilterrsButton = styled.div`
    color: #33aab4;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
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
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
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

type Props = {
    setMobileModal: Dispatch<SetStateAction<boolean>>
    filters: IFilter
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
}

function MobileFilter({ setMobileModal, filters, setFilters }: Props) {
    const [tempFilters, setTempFilters] = useState<IFilter>(filters)
    const [countyOpen, setCountyOpen] = useState<boolean>(false)
    const [speaksOpen, setSpeaksOpen] = useState<boolean>(false)

    function applyFilters() {
        setFilters(tempFilters)
        setMobileModal(false)
    }
    function clearFilters() {
        setFilters(DEFAULT_FILTERS)
        setTempFilters(DEFAULT_FILTERS)
    }
    return (
        <Wrapper>
            <ModalHeader>
                <RemoveFilterrsButton onClick={() => clearFilters()}>
                    Remove all
                </RemoveFilterrsButton>

                <CloseButton onClick={() => setMobileModal(false)}>
                    <AiOutlineClose />
                </CloseButton>
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
                            price={tempFilters.price}
                            setFilters={setTempFilters}
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
                            isNative={tempFilters.isNative}
                            setFilters={setTempFilters}
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
                            choosenDays={tempFilters.days}
                            choosenSchedule={tempFilters.time}
                            setFilters={setTempFilters}
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
                                countries={tempFilters.countries}
                                setFilters={setTempFilters}
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
                                languages={tempFilters.languages}
                                setFilters={setTempFilters}
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
                            setFilters={setTempFilters}
                            currentSort={tempFilters.sortBy}
                        />
                    </FilterItemContent>
                </FilterItem>
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => applyFilters()}>Apply filters</Button>
            </ModalFooter>
        </Wrapper>
    )
}

export default MobileFilter
