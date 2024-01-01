import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { MessageAPI } from '../../api/services/MessageService'
import { newMessage } from '../../types/Chat/ChatTypes'
import { ButtonLoader } from '../Loader/ButtonLoader'
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
const Text = styled.div`
    margin-top: 70px;
    text-align: center;
    color: #384047;
    font-family: Inter;
    font-size: 1.5rem;
    font-weight: 500;
`

const About = styled.div`
    margin: 10px 0px 15px 0px;
    text-align: center;
    color: #6f757b;
    font-family: Inter;
    font-size: 0.9rem;
`
const Button = styled.button`
    width: 100%;
    height: 50px;
    background: #3bb3bd;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 3px;
    color: white;
    font-family: Inter;
    font-size: 1.1rem;
    cursor: pointer;
`
const TextArea = styled.textarea`
    display: block;
    border: 1px solid #dadfe1;
    padding: 8px;
    box-sizing: border-box;
    font-family: Inter;
    height: 120px;
    width: 100%;
    resize: none;
    font-size: 14px;
    line-height: 1.42857143;
    background: #fff;
    margin-bottom: 20px;
    transition:
        box-shadow 0.2s,
        border 50ms;
    &:focus {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
        outline: none;
    }
`

type Props = {
    avatarSrc: string
    name: string
    setModalOpen: Dispatch<SetStateAction<boolean>>
    teacherId: string
    setSuccessfull: React.Dispatch<React.SetStateAction<boolean>>
}

function SendMessageModal({
    setSuccessfull,
    avatarSrc,
    name,
    setModalOpen,
    teacherId,
}: Props) {
    const [value, setValue] = useState('')
    const [messageSended, setSended] = useState(false)
    const userId = useAppSelector((state) => state.user.User?._id)
    const dispatch = useAppDispatch()
    useEffect(() => {
        window.addEventListener('keydown', (key) => {
            if (key.keyCode === 27) {
                setModalOpen(false)
            }
        })
    }, [])
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        setModalOpen(false)
        e.stopPropagation()
    }
    function sendMessage() {
        setSended(true)
        const message: newMessage = {
            senderId: userId!,
            text: value,
            receiverId: teacherId,
            time: new Date(),
        }
        MessageAPI.CheckConversationAndSendMessage(message).then((res) => {
            setSended(false)
            setModalOpen(false)
            setSuccessfull(true)
        })
    }
    return (
        <ModalWrapper onClick={(e) => handleClick(e)}>
            <ModalItem onClick={(e) => e.stopPropagation()}>
                <Text>Contact with {name}</Text>
                <About>
                    Tell the tutor about yourself, your requirements and your
                    learning goals.
                </About>
                <TextArea
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your message here..."
                />
                <Button onClick={() => sendMessage()}>
                    {messageSended ? <ButtonLoader /> : 'Send a message'}
                </Button>
                <Avatar>
                    <img src={avatarSrc} />
                </Avatar>
            </ModalItem>
        </ModalWrapper>
    )
}

export default SendMessageModal
