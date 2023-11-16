import React, { Dispatch, SetStateAction } from 'react'
import { BiMicrophone } from 'react-icons/bi'
import { BsCameraVideo, BsFillCameraVideoFill, BsFillMicFill } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'
import { IoIosCall } from 'react-icons/io'
import { PiMicrophoneLight } from 'react-icons/pi'
import styled from 'styled-components'
const CallSettingsWrapper = styled.div`
    position: fixed;
    display: flex;
    gap:20px;
    bottom: 10px;
    left: 50%;
    width: 300px;
    height: 60px;
    margin-left: -150px;

`
const SettingsButton = styled.div`
    width:50px;
    box-shadow: -3px -1px 40px 15px #00000014;
    height:50px;
    border-radius:50%;
    background:white;
    display:flex;
    align-items:center;
    justify-content:center;
`
type Props = {
    setViewModal:Dispatch<SetStateAction<boolean>>
}

function CallSettings({setViewModal}: Props) {
    return (
        <CallSettingsWrapper>
            <SettingsButton><BsCameraVideo/></SettingsButton>
            <SettingsButton><PiMicrophoneLight/></SettingsButton>
            <SettingsButton onClick={() => setViewModal(true)}><FiMonitor/></SettingsButton>
            <SettingsButton><IoIosCall/></SettingsButton>
        </CallSettingsWrapper>
    )
}

export default CallSettings
