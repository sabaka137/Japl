import React, { useState } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { Box, Flex, Text } from '../../../components/Common'
import { TeacherPageButton } from '../style'
import { BsLightningCharge } from 'react-icons/bs'
import BookLessonModal from '../../../components/Modal/BookLessonModal'
import { User, UserSchedule } from '../../../types/User/UserTypes'
const Wrapper = styled.div`
    display: none;
    width: 100%;
    min-height: 120px;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 -2px 24px rgba(0, 0, 0, 0.2);
    @media (max-width: 1028px) {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
`
const Top = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
`

const Bottom = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
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

type Props = {
    teacher: User | null
    schedule: UserSchedule[]
}

function BottomPanel({ teacher, schedule }: Props) {
    const [scheduleModal, setScheduleModal] = useState(false)
    function OpenScheduleModal() {
        setScheduleModal(true)
    }
    return (
        <Wrapper>
            <Top>
                <Flex justify="center" gap="20px" align="center">
                    <div>
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
                    </div>
                    <Flex direction="column" align="center">
                        <Text fz={'1.3rem'} fw={'400'}>
                            {teacher?.price}
                            <span>$</span>
                        </Text>
                        <Text color="#6F757B" fz={'0.9rem'}>
                            50 minute
                        </Text>
                    </Flex>
                </Flex>
            </Top>
            <Bottom>
                <TeacherPageButton
                    onClick={() => OpenScheduleModal()}
                    isFill={true}
                >
                    <BsLightningCharge />
                    Book a trial lesson
                </TeacherPageButton>
            </Bottom>
            {scheduleModal &&
                createPortal(
                    <BookLessonModal
                        avatarSrc={teacher!.photo}
                        setBookModal={setScheduleModal}
                        schedule={schedule}
                    />,
                    document.body
                )}
        </Wrapper>
    )
}

export default BottomPanel
