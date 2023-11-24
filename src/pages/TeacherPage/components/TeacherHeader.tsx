import ReactCountryFlag from 'react-country-flag'
import React, { useState } from 'react'
import { Flex, Text } from '../../../components/Common'
import styled from 'styled-components'
import { TbMessage } from 'react-icons/tb'
import { PiStudentLight } from 'react-icons/pi'
import { FaRegCircleDot } from 'react-icons/fa6'
import { TeacherPageButton } from '../style'
import { User } from '../../../types/User/UserTypes'
import { BiHeart, BiMessageRounded, BiSolidHeart } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../../hooks/hook'
import { useNavigate, useParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import SendMessageModal from '../../../components/Modal/SendMessageModal'
import {
    AddToFavorite,
    RemoveFromFavorite,
} from '../../../redux/reducers/UserSlice'

//fix- add clip-path
const Avatar = styled.div`
    min-width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #47ebbf;
    img {
        min-width: 150px;
        height: 150px;
    }
    @media (max-width: 400px) {
        min-width: 100px;
        height: 100px;
        img {
            min-width: 100px;
            height: 100px;
        }
    }
`
const AvatarContainer = styled.div`
    position: relative;
    &:before {
        background: transparent
            url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuMTk1IDE1LjkzNGMuNzA2IDEuNjY1IDEuOTQ2IDIuOTI2IDMuODU2IDMuMjggMS43MDguMzE2IDMuNDc1LS4zMzMgNC44NzgtMS4zNDguNjU3LS40NzYgMS4yNjktMS4wNSAxLjYxOC0xLjc4MS4zMTMtLjY1Ni4zOTYtMS4zOTUuNTgtMi4wOThhNy40MDUgNy40MDUgMCAwIDEgMi4yMjQtMy42MzFjLjg1Ni0uNzYzIDEuODgtMS4zMTYgMi43NjUtMi4wNDUuODg1LS43MjkgMS42Ni0xLjcxMyAxLjczMy0yLjg1OC4wNTItLjgyMy0uMjctMS42MzgtLjc0OC0yLjMxMS0xLjE1Ni0xLjYyNS0zLjE4Mi0yLjQ4LTUuMTcyLTIuNTg0LTEuOTktLjEwNC0zLjk1Ny40NjItNS43OTkgMS4yMTMtMS43NzguNzI1LTMuNTM5IDEuNjc1LTQuNzA0IDMuMTk4Qy41NDcgNy40MjYtLjI1IDEyLjUyNiAxLjE5NSAxNS45MzRaIiBmaWxsPSIjNTJENURGIi8+PC9zdmc+)
            0 0 no-repeat;
        content: '';
        height: 20px;
        left: -20px;
        position: absolute;
        top: -10px;
        width: 20px;
    }
`
const GeneralInfoContainer = styled.div`
    margin-left: 175px;
    margin-top: -80px;
    font-family: Inter;
    @media (max-width: 800px) {
        margin-left: 0px;
        margin-top: 0px;
    }
`
const TeacherContainer = styled.div`
    flex: 1;
    @media (max-width: 800px) {
        min-width: 50%;
        flex: 2;
    }
`
const TeacherName = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    font-family: Inter;
    color: #3c4447;
`
const HeaderDescription = styled.div`
    font-weight: 400;
    font-size: 0.9rem;
    font-family: Inter;
    align-items: center;
    margin-top: 4px;
    color: #3c4447;
    @media (max-width: 500px) {
        font-size: 0.8rem;
    }
`
const InfoItem = styled.div`
    display: flex;
    align-items: center;
    span {
        color: #3c4447;
        font-size: 0.9rem;
        margin-left: 10px;
    }
    svg {
        font-size: 1.1rem;
        color: #aeb5bc;
    }
`

const MobileBottomPanel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 -2px 24px rgba(0, 0, 0, 0.4);
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px 0px;
    display: none;
`
const NewUserLabel = styled.div`
    background: #daf2dc;
    color: #007913;
    text-align: center;
    height: 70px;
    width: 100px;

    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LessonInfo = styled.div`
    display: flex;
    flex: 1,
    font-family: Inter;
    height: 70px;
    flex-direction: column;
    align-items: center;
`
const LessonPrice = styled.div`
    font-size: 1.2rem;
    display: flex;
    gap: 5px;
    font-weight: 400;
`
const LessonLength = styled.div`
    color: #6f757b;
    font-size: 0.9rem;
    text-align: center;
`
const Bottom = styled.div`
    width: 100%;
    margin-top: 40px;
    display: none;
    @media (max-width: 1028px) {
        display: block;
    }
`
const HeaderContainer = styled.div`
    width: 65%;
    position: relative;
    flex-wrap: wrap;
    display: flex;
    gap: 25px;
    @media (max-width: 800px) {
        width: 100%;
    }
`
const LanguageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 10px 0px;
    gap: 10px;
    @media (max-width: 720px) {
        margin: 20px 0px 10px;
    }
`
const LanguageList = styled.div`
    display: flex;
    align-items: center;
    margin-top: -4px;
    flex-wrap: wrap;
    gap: 5px;
`
const Language = styled.div`
    color: #8194a7;
    font-size: 14px;
    font-weight: 500;
`
const LanguageLevel = styled.div`
    padding: 3px 7px;
    color: #007913;
    background: #daf2dc;
    border-radius: 5px;
    font-size: 14px;
`

type Props = {
    currentTeacher: User | null
}

export const TeacherHeader = ({ currentTeacher }: Props) => {
    const [messageModal, setMessageModal] = useState(false)
    const User = useAppSelector((state) => state.user.User)
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useAppDispatch()

    function OpenMessageModal() {
        if (User !== null) {
            setMessageModal(true)
        } else {
            navigate('/login')
        }
    }
    function addToFavorite() {
        if (User !== null) {
            dispatch(AddToFavorite(currentTeacher!._id))
        } else {
            navigate('/login')
        }
    }

    function removeFromFavorite() {
        dispatch(RemoveFromFavorite(currentTeacher!._id))
    }
    return (
        <>
            <HeaderContainer>
                <AvatarContainer>
                    <Avatar>
                        <img src={currentTeacher?.photo} alt="teacher-avatar" />
                    </Avatar>
                </AvatarContainer>
                <TeacherContainer>
                    <TeacherName>
                        {currentTeacher?.name} {currentTeacher?.surname[0]}.
                        <ReactCountryFlag
                            countryCode={currentTeacher!.country}
                            style={{
                                fontSize: '0.9rem',
                                marginLeft: '10px',
                            }}
                            svg
                        />
                    </TeacherName>
                    <HeaderDescription>
                        {currentTeacher?.description.header}
                    </HeaderDescription>
                </TeacherContainer>
                <GeneralInfoContainer>
                    <div>
                        <InfoItem>
                            <PiStudentLight />
                            <span>Teaching: Japanese</span>
                        </InfoItem>
                        <LanguageContainer>
                            <InfoItem style={{ color: '#3C4447' }}>
                                <TbMessage />
                            </InfoItem>
                            <LanguageList>
                                <Text color="#3C4447" fz="14px">
                                    Languages:
                                </Text>
                                {currentTeacher?.languages.map((el, index) => (
                                    <Flex
                                        key={index}
                                        justify="center"
                                        align="center"
                                        gap="5px"
                                    >
                                        <Language>Английский</Language>
                                        <LanguageLevel>
                                            Родной язык
                                        </LanguageLevel>
                                    </Flex>
                                ))}
                            </LanguageList>
                        </LanguageContainer>
                        <InfoItem>
                            <FaRegCircleDot />
                            <span>Lessons: 0</span>
                        </InfoItem>
                    </div>
                </GeneralInfoContainer>
            </HeaderContainer>
            <Bottom>
                <Flex direction="column" gap="10px">
                    <TeacherPageButton onClick={() => OpenMessageModal()}>
                        <BiMessageRounded />
                        Send a message
                    </TeacherPageButton>
                    <TeacherPageButton
                        onClick={() =>
                            currentTeacher?.inFavorite
                                ? removeFromFavorite()
                                : addToFavorite()
                        }
                    >
               
                        {currentTeacher?.inFavorite ? (
                            <BiSolidHeart />
                        ) : (
                            <BiHeart />
                        )}
                        {currentTeacher?.inFavorite ? 'Saved' : 'Save to list'}
                    </TeacherPageButton>
                </Flex>

                <MobileBottomPanel>
                    <Flex justify="space-around">
                        <NewUserLabel>Recently on the platform</NewUserLabel>
                        <LessonInfo>
                            <LessonPrice>
                                {currentTeacher?.price}
                                <span>$</span>
                            </LessonPrice>
                            <LessonLength>50 minute</LessonLength>
                        </LessonInfo>
                    </Flex>
                    <TeacherPageButton>Book a lesson</TeacherPageButton>
                </MobileBottomPanel>
            </Bottom>
            {messageModal &&
                createPortal(
                    <SendMessageModal
                        avatarSrc={currentTeacher!.photo}
                        name={currentTeacher!.name}
                        setModalOpen={setMessageModal}
                        teacherId={id!}
                    />,
                    document.body
                )}
        </>
    )
}
