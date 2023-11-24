import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch } from '../../hooks/hook'
import { AuthSliceAsyncActions } from '../../redux/reducers/AuthSlice'
const Wrapper = styled.div`
    position: fixed;
    width: 150px;
    background: white;
    top: 60px;
    right: 15px;
    box-sizing: border-box;
    z-index:10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
    transition: all 0.25s;
    padding: 5px 0px;
    color: black;
    > * {
        &:last-child {
            border-top: 1px solid #edeff0;
        }
    }
`
const Item = styled(NavLink)`
    display: block;
    text-decoration: none;
    font-family: Inter;
    color: #6f757b;
    font-size: 0.9rem;
    box-sizing: border-box;
    padding: 5px 10px;
    &:hover {
        cursor: pointer;
        background: #eeeeee;
    }
`
export const AvatarModal = ({}) => {
    const dispatch = useAppDispatch()
    function Logout() {
        dispatch(AuthSliceAsyncActions.LogOut())
    }
    return (
        <Wrapper>
            <Item to={'/messages'}>Messages</Item>
            <Item to={'/lessons'}>My lessons</Item>
            <Item to={'/settings'}>Settings</Item>
            <Item to={'/favorite-teachers'}>Saved</Item>
            <Item onClick={() => Logout()} to={'/'}>
                Log out
            </Item>
        </Wrapper>
    )
}
