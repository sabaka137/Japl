import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import styled from 'styled-components'
import { IFilter } from '../../../types/Teachers/TeachersType'
const Wrapper = styled.div`
    width: 65%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    @media (max-width: 1000px) {
        width: 100%;
    }
`
const Arrow = styled.div<{ isVisible: boolean }>`
    display: ${(props) => (props.isVisible ? 'flex' : 'none')};
    align-items: center;
    cursor: pointer;
    color: #4d4c5c;
    font-size: 18px;
`
const CountWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 20px;
    @media (max-width: 420px) {
        margin: 0px 10px;
    }
`
const Separator = styled.div`
    margin: 0px 10px;
    color: #4d4c5c;
    font-size: 14px;
    letter-spacing: 1.4px;
    cursor: pointer;
    @media (max-width: 420px) {
        margin: 0px 5px;
    }
`
const Container = styled.div`
    display: flex;
    gap: 10px;
    @media (max-width: 420px) {
        margin: 0px 5px;
    }
`
const Item = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Inter;
    color: ${(props) => (props.isActive ? 'black' : '#4d4c5c')};
    background: ${(props) => (props.isActive ? '#ff7aac' : 'none')};
    font-size: 14px;
    height: 32px;
    width: 32px;
    border-radius: 3px;
    cursor: pointer;
    @media (max-width: 420px) {
        height: 26px;
        width: 26px;
    }
`
type Props = {
    setFilters: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
    pagesTotal: number
}

function PaginationPanel({ pagesTotal, currentPage, setFilters }: Props) {
    function setSpecificPage(page: number) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setFilters(page)
    }
    function arrayRange(start: number, stop: number) {
        return Array.from(
            { length: stop - start + 1 },
            (value, index) => start + index
        )
    }
    return (
        <Wrapper>
            <Arrow
                isVisible={currentPage > 1}
                onClick={() => setSpecificPage(currentPage - 1)}
            >
                <IoIosArrowBack />
            </Arrow>
            <CountWrapper>
                {pagesTotal > 3 && (
                    <>
                        {currentPage >= 3 && (
                            <Item
                                onClick={() => setSpecificPage(1)}
                                isActive={false}
                            >
                                1
                            </Item>
                        )}
                        {currentPage >= 3 && <Separator>...</Separator>}
                    </>
                )}

                <Container>
                    {pagesTotal > 3 ? (
                        <>
                            {currentPage < 3 &&
                                currentPage + 3 < pagesTotal &&
                                Array.from(Array(currentPage + 1).keys()).map(
                                    (item) => (
                                        <Item
                                            onClick={() =>
                                                setSpecificPage(item + 1)
                                            }
                                            isActive={currentPage === item + 1}
                                            key={item}
                                        >
                                            {item + 1}
                                        </Item>
                                    )
                                )}
                            {currentPage >= 3 &&
                                currentPage + 3 < pagesTotal && (
                                    <>
                                        <Item
                                            onClick={() =>
                                                setSpecificPage(currentPage - 1)
                                            }
                                            isActive={false}
                                        >
                                            {currentPage - 1}
                                        </Item>
                                        <Item isActive>{currentPage}</Item>
                                        {currentPage + 1 < pagesTotal && (
                                            <Item
                                                onClick={() =>
                                                    setSpecificPage(
                                                        currentPage + 1
                                                    )
                                                }
                                                isActive={false}
                                            >
                                                {currentPage + 1}
                                            </Item>
                                        )}
                                    </>
                                )}
                            {currentPage + 3 >= pagesTotal &&
                                arrayRange(currentPage - 1, pagesTotal).map(
                                    (item) => (
                                        <Item
                                            onClick={() =>
                                                setSpecificPage(item)
                                            }
                                            isActive={currentPage === item}
                                            key={item}
                                        >
                                            {item}
                                        </Item>
                                    )
                                )}
                        </>
                    ) : (
                        arrayRange(1, pagesTotal).map((item) => (
                            <Item
                                onClick={() => setSpecificPage(item)}
                                isActive={currentPage === item}
                                key={item}
                            >
                                {item}
                            </Item>
                        ))
                    )}
                </Container>
                {currentPage + 3 < pagesTotal && <Separator>...</Separator>}
                {currentPage + 3 < pagesTotal && (
                    <Item
                        onClick={() => setSpecificPage(pagesTotal)}
                        isActive={false}
                    >
                        {pagesTotal}
                    </Item>
                )}
            </CountWrapper>
            <Arrow
                isVisible={currentPage !== pagesTotal}
                onClick={() => setSpecificPage(currentPage + 1)}
            >
                <IoIosArrowForward />
            </Arrow>
        </Wrapper>
    )
}

export default PaginationPanel
