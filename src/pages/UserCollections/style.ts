import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
export const CollectionContent = styled.div`
    padding: 0px 140px;
    margin: 0 auto;
    box-sizing: border-box;
    @media (max-width: 1200px) {
        padding: 0px 80px;
    }
    @media (max-width: 1028px) {
        padding: 0px 20px;
    }
`
export const CollectionContainer = styled.div`
    width: 75%;
    margin: 0 auto;
    @media (max-width: 1428px) {
        width: 100%;
    }
`
export const FlashcardsInfo = styled.div`
    width: 100%;
    height: 100px;
    font-size: 1.3rem;
    font-weight: bold;
    background: #2e3856;
    border-radius: 15px;
    margin-bottom: 80px;
    padding: 0px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const SelectedGroupWrapper = styled.div`
    font-size: 3rem;
`
export const CollectionName = styled.div`
    font-size: 2.2rem;
    margin-bottom: 20px;
    color: #2e3856;
    font-family: Inter;
    font-weight: 600;
`
export const Type = styled.div`
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: black;
    font-family: Noto Sans;
`
export const TypesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    @media (max-width: 600px) {
        display: block;
    }
`
//#2e3856 bg
export const TypeButton = styled(NavLink)<{
    disabled?: boolean
    active?: boolean
}>`
    height: 50px;
    display: flex;
    pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
    padding: 0px 20px;
    border-radius: 5px;
    align-items: center;
    background: ${(props) => (props.disabled ? '#F1EFEF' : 'white')};
    box-shadow: 0 0.0625rem 0.1875rem 0 #2e385614;
    margin-left: 10px;
    font-weight: bold;
    color: white;
    flex: 1 1;
    text-decoration: none;
    box-sizing: border-box;
    position: relative;
    div {
        display: flex;
        align-items: center;
        font-family: Inter;
        font-size: 1rem;
        gap: 10px;
        color: ${(props) =>
            props.disabled ? 'grey' : props.active ? '#001B79' : '#2e3856'};
        svg {
            font-size: 1.4rem;
            color: ${(props) => (props.disabled ? 'grey' : 'blue')};
        }
    }

    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        top: 45px;
        left: 0;
        height: 3px;
        background: #8a8bc9;
        transition: width 0.3s;
    }
    &:hover::after {
        width: ${(props) => (props.disabled ? '0' : '100%')};
    }
    @media (max-width: 600px) {
        margin-top: 10px;
    }
`
