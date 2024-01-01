import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Text } from '../Common'
import { AiOutlineClose } from 'react-icons/ai'
const ModalItem = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-left: 4px solid #6bb3fc;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    width: 365px;
    height: 55px;
    box-sizing: border-box;
    padding: 0px 15px 0px 10px;
`
const TextLink = styled(NavLink)`
    color: #145699;
    font-size: 14px;
    text-decoration: none;
`
type Props = {
    setSuccessfullLesson: React.Dispatch<React.SetStateAction<boolean>>
}

function SuccessfullBookLesson({ setSuccessfullLesson }: Props) {
    useEffect(() => {
        setTimeout(() => {
            setSuccessfullLesson(false)
        }, 4000)
    }, [])
    const handleClose = () => {
        setSuccessfullLesson(false)
    }
    return (
        <ModalItem>
            <div>
                <Text ff="Noto Sans" fw="400" color="#6bb3fc">
                    Successfully booked
                </Text>
                <Text opacity={0.65} fw="500" fz="14px" ff="Noto Sans">
                    You can see it right{' '}
                    <TextLink to={'/lessons'}>here</TextLink>
                </Text>
            </div>
            <AiOutlineClose
                cursor={'pointer'}
                onClick={() => handleClose()}
                color="grey"
                fontSize={'20px'}
            />
        </ModalItem>
    )
}

export default SuccessfullBookLesson
