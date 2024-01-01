import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '../Common'
import { AiOutlineClose } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

const ModalItem = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-left: 4px solid #58db69;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    width: 365px;
    height: 55px;
    box-sizing: border-box;
    z-index: 40;
    padding: 0px 15px 0px 10px;
    @media (max-width: 440px) {
        width: 250px;
    }
`
const TextLink = styled(NavLink)`
    color: #0766ad;
    font-size: 14px;
    text-decoration: none;
`
type Props = {
    setSuccessfull: React.Dispatch<React.SetStateAction<boolean>>
}
function SuccessfullMessage({ setSuccessfull }: Props) {
    useEffect(() => {
        setTimeout(() => {
            setSuccessfull(false)
        }, 4000)
    }, [])
    const handleClose = () => {
        setSuccessfull(false)
    }
    return (
        <ModalItem>
            <div>
                <Text ff="Noto Sans" fw="400" color="#36e873">
                    Message sended
                </Text>
                <Text opacity={0.65} fw="500" fz="14px" ff="Noto Sans">
                    You can see it right{' '}
                    <TextLink to={'/messages'}>here</TextLink>
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

export default SuccessfullMessage
