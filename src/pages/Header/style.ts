import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderWrapper = styled.div<{ pathname: string }>`
    padding: 15px 25px;
    background: ${(props) =>
        props.pathname === '/teachers' ? '#f3f3f3' : 'white'};

    width: 100%;
    display: flex;

    box-sizing: border-box;
    justify-content: space-between;
    @media (max-width: 767px) {
        padding: 15px 10px;
    }
`

export const LeftSide = styled.nav`
    display: flex;
    align-items: center;
    flex: 1;
    @media (max-width: 650px) {
        display: none;
    }
`
export const Separator = styled.nav`
    width:1px;
    height:23px;
    background:#8194a7;
    @media(max-width:1000px){
        display:none;
    }
`
export const NavItems = styled.nav`
display:flex;
    @media (max-width: 1000px) {
        display: none;
    }
`

export const NavItem = styled(NavLink)<{ pathname: string }>`
    font-size: 1rem;
    display:block;
    text-decoration: none;
    margin: 0px 10px;
    font-family: Inter;
    color: ${(props) => (props.pathname === '/teachers' ? '#384047' : 'black')};

    &:hover {
        opacity: 1;
        color: #52667d;   
    }
`
export const ButButton = styled.div`
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    justify-content: center;
    border: 0;
    align-items: center;
    margin-right: 20px;
    min-height: 32px;
    font-size: 14px;
    line-height: 1;
    text-decoration: none;
    font-weight: 500;
    border-radius: 2px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    cursor: pointer;
    outline: 0;
    transition: background-color 50ms;
    color: #fff;
    background-color: #3bb3bd;
    padding: 8px 16px;
`
export const InviteFriend = styled.div`
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    justify-content: center;
    border: 0;
    align-items: center;
    min-height: 32px;
    font-size: 14px;
    line-height: 1;
    text-decoration: none;
    font-weight: 500;
    border-radius: 2px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    cursor: pointer;
    outline: 0;
    transition: background-color 50ms;
    color: #3bb3bd;
    background-color: white;
    border: 1px solid #dadfe1;
    padding: 8px 16px;
`

export const UserContainer = styled.div`
    display: flex;
    margin-left: 50px;
`
export const OpenSidebarButton = styled.div`
display:flex;
align-items:center;
margin:0px 10px;
cursor:pointer;
svg{
    font-size:1.4rem;
}
@media (min-width: 1001px) {
    display: none;
}
`

export const OpenSearchButton = styled(OpenSidebarButton)`
@media (min-width: 650px) {
    display: none;
}
`