import React from 'react'
import styled from 'styled-components'
import { Text } from '../Common'
import { AiOutlineClose } from 'react-icons/ai'
const ModalWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 15px;
`
const ModalItem = styled.div`
position:absolute;
bottom:20px;
right:20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-left: 4px solid #58db69;
    position: relative;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    width: 365px;
    height: 55px;
    box-sizing: border-box;
    padding: 0px 15px 0px 10px;
`
type Props = {}

function SuccessfullMessage({}: Props) {
    return (
        <>
            <ModalItem>
                <div>
                    <Text fw="bold">Успешно</Text>
                    <Text opacity={0.65} fw='500' fz="14px">Можете посмотреть сообщения в чате</Text>
                </div>
                <AiOutlineClose color='grey' fontSize={'20px'} />
            </ModalItem>
        </>
    )
}

export default SuccessfullMessage
