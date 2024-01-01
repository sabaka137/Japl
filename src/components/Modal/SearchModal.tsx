import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import HeaderSearch from '../../pages/Header/components/HeaderSearch/HeaderSearch'
const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    z-index: 10;
    height: 110%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding: 100px 15px 0px;
`

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>
}

function SearchModal({ setOpen }: Props) {
    return (
        <Wrapper onClick={() => setOpen(false)}>
            <HeaderSearch />
        </Wrapper>
    )
}

export default SearchModal
