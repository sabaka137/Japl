import styled from 'styled-components'

export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    max-width: 1220px;
    box-sizing: border-box;
    @media (min-width: 1370px) {
        width: 80%;
        margin: 0 auto;
    }
    @media (max-width: 1570px) {
        width: 90%;
        margin: 0 auto;
    }
    @media (max-width: 1064px) {
        width: 100%;
        margin: 0 auto;
        padding: 0px 20px;
    }
    @media (max-width: 504px) {
        padding: 0px 10px;
    }
`

export const ContentContainer = styled.div`
    width: 100%;
    margin: 0px 0px 0px 0px;
    @media (min-width: 1320px) {
        width: 60%;
        margin: 0px 0px 0px 10%;
    }
`
