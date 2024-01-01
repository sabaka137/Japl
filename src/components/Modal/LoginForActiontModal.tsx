import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
const ModalWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
    background: rgba(56, 64, 71, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalItem = styled.div`
    background: white;
    border-radius: 5px;
    position: relative;
    width: 365px;
    box-sizing: border-box;
    padding: 0px 32px 32px;
`
const Avatar = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    width: 90px;
    height: 90px;
    margin-top: -45px;
    margin-left: -45px;
    border-radius: 50%;
    background: transparent;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
    }
`
type Props = {
    avatarSrc: string
    name: string
    setActionModal: Dispatch<SetStateAction<boolean>>
    teacherId: string
}

function LoginForActiontModal({ avatarSrc }: Props) {
    return (
        <ModalWrapper>
            <ModalItem>
                <Avatar>
                    <img src={avatarSrc} />
                </Avatar>
            </ModalItem>
        </ModalWrapper>
    )
}

export default LoginForActiontModal
