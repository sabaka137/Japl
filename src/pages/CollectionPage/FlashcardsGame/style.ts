import styled, { keyframes } from 'styled-components'

interface IProps {
    isTerm?: Boolean
    animation?: string
    isDisabled?: boolean
}
const SlideLeft = keyframes`
 0% { transform: rotateY(20deg)}

 100% { transform: rotateY(0) }
 `
const SlideRight = keyframes`
 0% { transform: rotateY(-20deg)}
 100% { transform: rotateY(0deg) }
 `
export const GameContainer = styled.div`
    font-size: 1.5rem;
    margin-bottom: 20px;
    margin-top: 30px;
`
export const CollectionTermin = styled.div`
    display: flex;
    justify-content: center;
`
export const CollectionReading = styled.div`
    padding: 0px 30px;
    display: flex;
    justify-content: center;
`
//bg #2e3856
export const CardFront = styled.div<IProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background: white;
    color: #2e3356;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    position: absolute;
    transform: ${(props) => props.isTerm && 'rotateX(180deg)'};
    animation-name: ${(props) =>
        props.animation === 'left'
            ? SlideLeft
            : props.animation === 'right' && SlideRight};
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    transition: ${(props) => props.animation === '' && '0.3s'};
    backface-visibility: hidden;
    div {
        text-align: center;
    }
    @media (max-width: 600px) {
        font-size: 2.1rem;
    }
    @media (max-width: 400px) {
        font-size: 1.7rem;
    }
`
export const CardBack = styled.div<IProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    color: #2e3356;
    background: white;
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    transform: ${(props) =>
        props.isTerm ? 'rotateX(360deg)' : 'rotateX(180deg)'};
    transition: ${(props) => props.animation === '' && '0.3s'};
    backface-visibility: hidden;

    div {
        text-align: center;
    }
    @media (max-width: 600px) {
        font-size: 2.2rem;
    }
    @media (max-width: 400px) {
        font-size: 1.7rem;
    }
`

export const GameWindow = styled.div`
    width: 100%;
    min-height: 500px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    border-radius: 10px;
    perspective: 1000px;

    &:hover {
        cursor: pointer;
    }
    @media (max-width: 600px) {
        min-height: 350px;
    }
`

export const GameMenu = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const LeftArrow = styled.button<IProps>`
    width: 50px;
    height: 50px;
    outline: none;
    border: ${(props) =>
        props.isDisabled ? '1px solid #e1e4ed' : '1px solid #e1e4ed'};
    background: white;
    color: ${(props) => (props.isDisabled ? 'grey' : 'white')};
    border: 0.0625rem solid #d9dde8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        color: ${(props) => (props.isDisabled ? '#d9dde8' : '#586380')};
        font-size: 1.8rem;
    }
    &:hover {
        cursor: ${(props) => (props.isDisabled ? '' : 'pointer')};
        background: ${(props) => (props.isDisabled ? 'white' : '#edeff4')};
    }
`

export const RightArrow = styled.button<IProps>`
    width: 50px;
    height: 50px;
    outline: none;
    border: ${(props) =>
        props.isDisabled ? '1px solid #e1e4ed' : '1px solid #e1e4ed'};
    background: white;
    color: ${(props) => (props.isDisabled ? 'grey' : 'white')};
    border: 0.0625rem solid #d9dde8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        color: ${(props) => (props.isDisabled ? '#d9dde8' : '#586380')};
        font-size: 1.8rem;
    }
    &:hover {
        cursor: ${(props) => (props.isDisabled ? '' : 'pointer')};
        background: ${(props) => (props.isDisabled ? 'white' : '#edeff4')};
    }
`
export const ShareButton = styled.button<IProps>`
    display: flex;
    align-items: center;
    gap: 5px;
    background: white;
    border: 0.0625rem solid #d9dde8;
    color: #586380;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 0.5rem;
    font-family: Inter;
    font-weight: 600;
    svg {
        font-size: 1.5rem;
    }
    &:hover {
        background: #edeff4;
        cursor: pointer;
    }
`
export const CollectionRating = styled.div<IProps>`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 5px;
    color: #586380;
    font-family: Inter;
    font-weight: bold;
    cursor: pointer;
    svg {
        color: #ffcd1f;
    }
`
