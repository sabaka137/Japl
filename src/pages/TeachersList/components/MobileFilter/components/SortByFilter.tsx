import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { IFilter } from '../../../../../types/Teachers/TeachersType'
import { Flex, Text } from '../../../../../components/Common'
import { AiOutlineCheck } from 'react-icons/ai'
const Wrpper = styled.div`
    margin-top: 20px;
    div {
        cursor: pointer;
    }
`

type Props = {
    currentSort: { value: string; label: string }
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
}

function SortByFilter({ currentSort, setFilters }: Props) {
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
        <Wrpper>
            <Flex direction="column" gap="5px">
                {sort.map((el) => (
                    <Flex
                        onClick={() => handleClick(el.id)}
                        key={el.id}
                        justify="space-between"
                        align="center"
                    >
                        <Text ff="Inter" key={el.id} fz="16px">
                            {el.label}
                        </Text>
                        {el.checked && <AiOutlineCheck />}
                    </Flex>
                ))}
            </Flex>
        </Wrpper>
    )
}

export default SortByFilter
