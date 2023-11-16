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
const MessageItem = styled.div<{ owner: boolean}>`
    display: flex;
    gap: 10px;
    align-self: ${(props) => (props.owner ? 'flex-end' : 'flex-start')};
    max-width: 45%;
    margin-top: 10px;
`
const AvatarContainer = styled.div<{ owner: boolean }>`
    display: ${(props) => (props.owner ? 'none' : 'block')};
    align-self: flex-end;
    min-width: 30px;
`

const Avatar = styled.div`
    width: 30px;
    height: 30px;
    background:#dbdbdb;
    border-radius: 50%;
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
    img {
        width: 30px;
        height: auto;
    }
`

const MessageText = styled.div<{ owner: boolean,test?:boolean }>`
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

    padding: 12px;
    border-radius: 10px;
    width: ${props => props.test ? '90px':'140px' };
    height: 30px;
    display: flex;
    line-height: 1.2rem;
    flex-direction: column;

    color: #384047;
    text-align: left;
    font-weight: 400;
`
const MessageTime = styled.div`
    align-self: flex-end;
    font-size: 0.7rem;
    color: #6f757b;
`
type Props = {
    owner: boolean
    test?:boolean
}

function SkeletonMessage({ owner,test }: Props) {
    
    return (
        <MessageItem owner={owner}>
            <AvatarContainer owner={owner}>
                <Avatar></Avatar>
            </AvatarContainer>
            <MessageText  test={test} owner={owner}>
                <MessageTime></MessageTime>
            </MessageText>
        </MessageItem>
    )
}

export default SkeletonMessage
