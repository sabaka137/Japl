import React from 'react'
import styled, { keyframes } from 'styled-components'
const LoadingAnimeation = keyframes`
 0% {transform:rotate(0turn)}

 100% { transform:rotate(1turn) }
 `
export const Loader = styled.div`
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
type Props = {}

function SearchLoader({}: Props) {
  return (
    <Loader/>
  )
}

export default SearchLoader