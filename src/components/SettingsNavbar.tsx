import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
const Wrapper = styled.div`
    width: 100;
    display: flex;
    min-height: 50px;
    background: #384047;
    box-sizing: border-box;
    align-items: center;
    gap: 25px;
    padding: 0px 30px;
    line-height: 0.9rem;
    @media (max-width: 768px) {
        display: none;
    }
`
const Item = styled(NavLink)`
    color: #aeb5bc;
    font-family: Inter;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;

    padding-bottom: 4px;
    &.active {
        box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 1);
    }
    &:hover {
        cursor: pointer;
        color: #fff;
        transition: color 0.2s;
    }
`
type Props = {}
export const SettingsNavbar = ({}: Props) => {
    return (
        <Wrapper>
            <Item to={'/messages'}>Messages</Item>
            <Item to={'/lessons'}>My lessons</Item>
            <Item to={'/settings'}>Settings</Item>
        </Wrapper>
    )
}

export default SettingsNavbar
