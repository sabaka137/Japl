import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const SearchWrapper = styled.div<{ isAuth?: boolean }>`
    position: relative;
    width: 40%;
    @media (max-width: 1400px) {
        width: 60%;
    }
    @media (max-width: 1000px) {
        width: ${(props) => (props.isAuth ? '100%' : '75%')};
    }
    @media (max-width: 650px) {
        width: 100%;
    }
`
export const InputContainer = styled.div`
    background: white;
    border: 2px solid #eff1f5;
    height: 40px;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 0px 15px;
    display: flex;
    align-items: center;
`
export const InputIcon = styled.div`
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
    }
`
export const HeaderInput = styled.input<{ pathname: string }>`
    width: 100%;
    position: relative;

    border-radius: 15px;
    background: white;
    border: none;
    position: relative;
    color: #6b7b98;
    z-index: 2;
    font-weight: bold;
    &:focus {
        outline: none;
    }
`
export const SearchResultsWrapper = styled.div`
    width: 100%;

    position: absolute;
    overflow: hidden;
    z-index: 2;
    margin-top: 10px;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    box-sizing: border-box;
    border-radius: 15px;
    background: white;
`

export const ResultItem = styled(NavLink)`
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    background: white;
    color: black;

    box-sizing: border-box;
    text-decoration: none;
    padding: 0px 20px;
    &:hover {
        background: #f6f7fb;
    }
`
export const ResultLoader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background: white;
    color: black;
    font-family: Inter;
    cursor: pointer;
    box-sizing: border-box;
    text-decoration: none;
    padding: 0px 20px;
`

export const HistoryContainer = styled.div``
export const Kanji = styled.div`
    font-size: 1.8rem;
    margin-right: 30px;
`
