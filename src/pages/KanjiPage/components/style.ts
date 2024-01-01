import styled, { keyframes } from 'styled-components'
interface IProps {
    isActive: boolean
}

export const ExampleContainer = styled.div`
    font-size: 1.8rem;

    min-height: 45px;
    padding: 10px 20px;
    background: white;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
`
export const InfoTypeContainer = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 2rem;
    margin-bottom: 30px;
`
export const InfoTypeItem = styled.div<IProps>`
    font-size: 2rem;
    color: #282e3e;
    padding: 20px 20px;
    border-bottom: ${(props) => props.isActive && '2px solid #282E3E'};
    &:hover {
        cursor: pointer;
    }
`
