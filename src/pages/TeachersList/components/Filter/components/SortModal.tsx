import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Text } from '../../../../../components/Common'
import { AiOutlineCheck } from 'react-icons/ai'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
const Wrapper = styled.div`
    width: 100%;
    background: white;
    position: absolute;
    top: 100%;
    margin-top: 10px;
    border-radius: 7px;
    z-index: 3;
    left: 0;
    box-sizing: border-box;
    padding: 15px;
    box-shadow: 0 0 0 2px #dcdce5;
`
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 5px 0px;
    font-family: Noto Sans;
    font-weight: 400;
    color: black;
    font-size: 16px;
`

type Props = {
    currentSort: { value: string; label: string }
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
}

function SortModal({ currentSort, setFilters }: Props) {
    const [sort, setSort] = useState([
        {
            id: 1,
            label: 'Our recommendations',
            value: 'default',
            checked: false,
        },
        {
            id: 2,
            label: 'Price: from high to low',
            value: 'desc',
            checked: false,
        },
        {
            id: 3,
            label: 'Price: from low to high',
            value: 'asc',
            checked: false,
        },
    ])
    useEffect(() => {
        setSort(
            sort.map((el) =>
                el.value === currentSort.value
                    ? { ...el, checked: true }
                    : { ...el, checked: false }
            )
        )
    }, [currentSort])

    function handleClick(id: number) {
        setSort(
            sort.map((el) =>
                el.id === id
                    ? { ...el, checked: true }
                    : { ...el, checked: false }
            )
        )
        setFilters((el) => ({
            ...el,
            sortBy: {
                value: sort.filter((s) => s.id === id)[0].value,
                label: sort.filter((s) => s.id === id)[0].label,
            },
        }))
    }
    return (
        <Wrapper>
            <Flex direction="column" gap="5px">
                {sort.map((el) => (
                    <Flex key={el.id} justify="space-between" align="center">
                        <Item onClick={() => handleClick(el.id)} key={el.id}>
                            {el.label}
                        </Item>
                        {el.checked && (
                            <AiOutlineCheck fontSize={18} color="black" />
                        )}
                    </Flex>
                ))}
            </Flex>
        </Wrapper>
    )
}

export default SortModal
