import { FiLogIn } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Flex } from '../../../components/Common'
import { Dispatch, SetStateAction, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import LocalizationModal from '../../../components/Modal/LocalizationModal'
import { Separator } from '../style'
import SearchModal from '../../../components/Modal/SearchModal'
import { createPortal } from 'react-dom'

const Localization = styled.div`
    color: #192435;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    position: relative;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    &:hover {
        color: #52667d;
    }
    svg {
        font-size: 18px;
    }
    @media (max-width: 1000px) {
        display: none;
    }
`
const LoginButton = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 5px;
    color: #192435;

    div {
        font-family: Inter;
        font-weight: 500;
        font-size: 0.9rem;
    }
    svg {
        font-size: 1.2rem;
    }
    @media (max-width: 1001px) {
        display: none;
    }
`
type Props = {
    localizationModal: boolean
    setLocalizationModal: Dispatch<SetStateAction<boolean>>
}

function NonAuthorizedUser({ setLocalizationModal, localizationModal }: Props) {

    return (
        <Flex align="center" gap="20px">
            
            <Separator />
            <LoginButton to={'/login'}>
                <FiLogIn /> <div>Log in</div>
            </LoginButton>
           
        </Flex>
    )
}

export default NonAuthorizedUser
