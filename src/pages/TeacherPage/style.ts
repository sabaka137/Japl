import styled from 'styled-components'

export const Header = styled.div`
    width: 100%;

    background: white;
    padding: 50px 20px;
    box-sizing: border-box;
`

export const TeacherContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    position: relative;
    @media (max-width: 1300px) {
        width: 80%;
    }
    @media (max-width: 1028px) {
        width: 100%;
    }
`
export const TeacherPageButton = styled.div<{ isFill?: boolean }>`
    width: 100%;
    height: 45px;
    border: ${(props) => (props.isFill ? '1px solid #3bb3bd' : 'none')};
    color: ${(props) => (props.isFill ? 'white' : '#090F19')};
    border-radius: 15px;
    background: ${(props) => (props.isFill ? '#0096b2' : '#f7f5f2')};
    display: flex;

    justify-content: center;
    align-items: center;
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    gap: 10px;
    svg {
        color: ${(props) => (props.isFill ? 'white' : 'black')};
        font-size: 1.4rem;
    }
    &:hover {
        background: ${(props) => props.isFill && '#22a2be'};
        cursor: pointer;
    }
    @media (max-width: 400px) {
        font-size: 12px;
    }
`
export const TeacherContent = styled.div`
    width: 60%;
    margin: 20px auto;
    box-sizing: border-box;
    @media (max-width: 1300px) {
        width: 80%;
    }
    @media (max-width: 1028px) {
        width: 100%;
        padding: 0px 30px;
    }
    @media (max-width: 768px) {
        width: 100%;
        padding: 0px 10px;
    }
    @media (max-width: 400px) {
        padding: 0px 5px;
    }
`
export const Avatar = styled.div`
    width: 170px;
    height: 170px;

    img {
        width: 170px;
        height: 170px;
    }
`
export const GeneralInfoContainer = styled.div``
