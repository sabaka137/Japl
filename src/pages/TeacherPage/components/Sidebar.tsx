import React, { useState } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { useNavigate, useParams } from 'react-router-dom'

import { User, UserSchedule } from '../../../types/User/UserTypes'

import { BsLightningCharge } from 'react-icons/bs'
import { Box, Flex, Text } from '../../../components/Common'
import { TeacherPageButton } from '../style'
import SendMessageModal from '../../../components/Modal/SendMessageModal'
import { BiHeart, BiMessageRounded, BiSolidHeart } from 'react-icons/bi'
import BookLessonModal from '../../../components/Modal/BookLessonModal'
import { useAppDispatch, useAppSelector } from '../../../hooks/hook'
import {
    AddToFavorite,
    RemoveFromFavorite,
} from '../../../redux/reducers/UserSlice'
import TutorPreview from '../../../assets/images/TutorPreview.jpg'
import SuccessfullMessage from '../../../components/Modal/SuccessfullMessage'
import SuccessfullBookLesson from '../../../components/Modal/SuccessfullBookLesson'
const Wrapper = styled.div`
    position: absolute;
    width: 340px;
    background: white;
    top: 0px;
    right: -100px;
    border-radius: 3px;
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.05);
    @media (max-width: 1028px) {
        display: none;
    }
`
const ContentContainer = styled.div`
    padding: 15px 20px 20px 20px;
`
const Video = styled.div`
    width: 100%;
    height: 190px;
    box-shadow: 0 0.625rem 0.25rem #00000014;

    img {
        width: 100%;
    }
`
const NewUserLabel = styled.div`
    background: #daf2dc;
    color: #007913;
    text-align: center;
    height: 70px;
    font-size: 14px;
    font-weight: 500;
    width: 100px;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 520px) {
        width: 80px;
        font-size: 12px;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
`
type Props = {
    teacher: User | null
    schedule: UserSchedule[]
}
function Sidebar({ teacher, schedule }: Props) {
    const [messageModal, setMessageModal] = useState(false)
    const [successfulMessage, setSuccessfull] = useState(false)
    const [successfulLesson, setSuccessfullLesson] = useState(false)
    const [scheduleModal, setScheduleModal] = useState(false)
    const User = useAppSelector((state) => state.user.User)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    function OpenMessageModal() {
        if (User !== null) {
            setMessageModal(true)
        } else {
            navigate('/login')
        }
    }
    function OpenScheduleModal() {
        if (User !== null) {
            setScheduleModal(true)
        } else {
            navigate('/login')
        }
    }
    function addToFavorite() {
        if (User !== null) {
            dispatch(AddToFavorite(teacher!._id))
        } else {
            navigate('/login')
        }
    }

    function removeFromFavorite() {
        dispatch(RemoveFromFavorite(teacher!._id))
    }
    return (
        <Wrapper>
            <Video>
                <img src={TutorPreview} alt="sidebar-preview" />
            </Video>

            <ContentContainer>
                <Flex justify="center" align="center">
                    <Box w={50}>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <div>
                                <NewUserLabel>
                                    Recently on the platform
                                </NewUserLabel>
                            </div>
                        </Flex>
                    </Box>
                    <Flex direction="column" align="center">
                        <Text fz={'1.3rem'} fw={'400'}>
                            14
                            <span>$</span>
                        </Text>
                        <Text color="#6F757B" fz={'0.9rem'}>
                            50 minute
                        </Text>
                    </Flex>
                </Flex>
                <ButtonsContainer>
                    <TeacherPageButton
                        isFill={true}
                        onClick={() => OpenScheduleModal()}
                    >
                        <BsLightningCharge />
                        Book a trial lesson
                    </TeacherPageButton>
                    <TeacherPageButton onClick={() => OpenMessageModal()}>
                        <BiMessageRounded />
                        Send a message
                    </TeacherPageButton>
                    <TeacherPageButton
                        onClick={() =>
                            teacher?.inFavorite
                                ? removeFromFavorite()
                                : addToFavorite()
                        }
                    >
                        {teacher?.inFavorite ? <BiSolidHeart /> : <BiHeart />}
                        {teacher?.inFavorite ? 'Saved' : 'Save to list'}
                    </TeacherPageButton>
                </ButtonsContainer>
            </ContentContainer>
            {messageModal &&
                createPortal(
                    <SendMessageModal
                        setSuccessfull={setSuccessfull}
                        avatarSrc={teacher!.photo}
                        name={teacher!.name}
                        setModalOpen={setMessageModal}
                        teacherId={id!}
                    />,
                    document.body
                )}
            {successfulMessage &&
                createPortal(
                    <SuccessfullMessage setSuccessfull={setSuccessfull} />,
                    document.body
                )}
            {successfulLesson &&
                createPortal(
                    <SuccessfullBookLesson
                        setSuccessfullLesson={setSuccessfullLesson}
                    />,
                    document.body
                )}
            {scheduleModal &&
                createPortal(
                    <BookLessonModal
                        setSuccessfullLesson={setSuccessfullLesson}
                        teacherId={teacher!._id}
                        avatarSrc={teacher!.photo}
                        setBookModal={setScheduleModal}
                        schedule={schedule}
                    />,
                    document.body
                )}
        </Wrapper>
    )
}

export default Sidebar
