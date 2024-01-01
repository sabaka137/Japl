import React from 'react'
import styled, { keyframes } from 'styled-components'
const load = keyframes`
from {
    left: -150px;
}
to   {
    left: 100%;
}
`
export const Wrapper = styled.div`
    width: calc(33.33333% - 50px);
    min-width: 200px;
    display: flex;
    justify-content: space-between;
    background: white;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    height: 130px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;

    @media (max-width: 545px) {
        width: 100%;
    }
`

export const Name = styled.div`
    width: 70%;
    min-width: 130px;
    height: 25px;
    border-radius: 10px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
`
export const Count = styled.div`
    height: 20px;
    min-width: 130px;
    border-radius: 10px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    margin-top: 8px;
`
export const Settings = styled.div`
    height: 25px;
    width: 25px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    border-radius: 20px;
`

function SkeletonCard() {
    return (
        <Wrapper>
            <div>
                <Name></Name>
                <Count></Count>
            </div>
            <Settings></Settings>
        </Wrapper>
    )
}

export default SkeletonCard
