import React from 'react'
import styled, { keyframes } from 'styled-components'
const LoadingAnimeation = keyframes`
 0% {transform:rotate(0turn)}

 100% { transform:rotate(1turn) }
 `
const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    z-index: 22;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`
const Loader = styled.div`
    pointer-events: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: black;
    animation-name: ${LoadingAnimeation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    box-sizing: border-box;
`

function FiltersLoader() {
    return (
        <Wrapper>
            <Loader />
        </Wrapper>
    )
}

export default FiltersLoader
