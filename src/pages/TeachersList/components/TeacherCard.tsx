import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Flex, Text } from '../../../components/Common'
import { NavLink, useNavigate } from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'
import { PiStudentLight } from 'react-icons/pi'
import { User } from '../../../types/User/UserTypes'
import SendMessageModal from '../../../components/Modal/SendMessageModal'
import { BiHeart, BiSolidHeart } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../../hooks/hook'
import {
    AddToFavorite,
    RemoveFromFavorite,
} from '../../../redux/reducers/UserSlice'
import BookLessonModal from '../../../components/Modal/BookLessonModal'
import LoginForActiontModal from '../../../components/Modal/LoginForActiontModal'
import { AiOutlineMessage } from 'react-icons/ai'
import SuccessfullMessage from '../../../components/Modal/SuccessfullMessage'
import { getLabel } from '../../../utils/GetLabelFromCode'
const TeacherCardWrapper = styled.div`
    width: 65%;
    min-height: 250px;
    border-radius: 20px;
    background: white;
    padding: 16px;
    box-sizing: border-box;
    margin-bottom: 30px;
    gap: 20px;
    flex-wrap: wrap;
    @media (max-width: 1000px) {
        width: 100%;
    }
`
const Photo = styled.div`
    position: relative;
    min-width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 20px;
    img {
        width: 150px;
        height: 150px;
    }
    @media (max-width: 400px) {
        min-width: 100px;
        height: 100px;
        img {
            width: 100px;
            height: 100px;
        }
    }
`
const Name = styled(NavLink)`
    font-family: Inter;
    font-weight: 500;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1.1rem;
    color: black;
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
const TeachesLanguage = styled.div`
    display: flex;
    align-items: center;
    margin-top: 3px;
    opacity: 0.8;
    font-family: Inter;
    font-size: 0.9rem;
`
const LessonInfo = styled.div`
    display: flex;
    flex: 1,
    font-family: Inter;
    height: 70px;
    flex-direction: column;
    justify-content:center;
    align-items: center;
`
const LessonPrice = styled.div`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 400;
    span {
        font-size: 14px;
    }
`
const TeacherShort = styled.div`
    @media (max-width: 720px) {
        margin-top: 15px;
    }
`
const LessonLength = styled.div`
    color: #6f757b;
    font-size: 0.9rem;
    text-align: center;
`
const Header = styled.div<{ DescriptionOpen: boolean }>`
    font-size: 13px;
    font-family: Inter;
    color: black;
    height: ${(props) => (props.DescriptionOpen ? 'auto' : '80px')};
    word-break: break-all;
    overflow: hidden;
    span {
        font-weight: 500;
        color: #090f19;
    }
`
const Interests = styled.div`
    display: inline;
    font-size: 13px;
    font-family: Inter;
    color: black;
    color: #8194a7;
    &::before {
        content: '—';
    }
`

const SendMessageButton = styled.button`
    width: 100%;
    height: 60px;
    background: #f7f5f2;
    border-radius: 10px;
    border: none;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    color: #090F1;
    display: flex;
    box-sizing: border-box;
    padding: 0px 20px;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: #fbf9f6;
    }
    @media (max-width: 400px) {
        width: 15%;
        height: 45px;
    }
`

const BookLesson = styled.button`
    width: 100%;
    height: 60px;
    background: #0096b2;
    font-family: Inter;
    text-align: center;
    font-size: 0.9rem;
    color: white;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
    box-sizing:border-box;
        padding: 0px 20px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: #22a2be;
    }
`
const TopBar = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    justify-content: space-between;
    @media (max-width: 720px) {
        justify-content: flex-start;
        width: 40%;
        flex-direction: column;
    }
`

const BottomBar = styled.div`
    display: flex;
    font-family: Inter;
    margin-left: 165px;
    margin-top: -80px;
    gap: 30px;
    @media (max-width: 720px) {
        margin: 0;
        flex-direction: column;
    }
`
const BottomBarText = styled.div`
    width: 80%;
    margin-top: -20px;
    @media (max-width: 720px) {
        width: 100%;
    }
`
const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    gap: 5px;
    @media (max-width: 720px) {
        margin: 20px 0px 10px;
    }
`
const Language = styled.div`
    color: #8194a7;
    font-size: 14px;
    font-weight: 500;
`
//#006987
//bg #c3f5fa
const LanguageLevel = styled.div`
    padding: 3px 7px;
    color: #007913;
    background: #daf2dc;
    border-radius: 5px;
    font-size: 14px;
`

const ButtonsContainer = styled.div`
    min-width: 25%;
    display: flex;
    flex-direction: column;

    @media (max-width: 720px) {
        min-width: 100%;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
        gap: 20px;
    }
    @media (max-width: 400px) {
        gap: 10px;
    }
`
const AvatarNavBar = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(
        180deg,
        rgba(57, 64, 70, 0.8),
        rgba(57, 64, 70, 0) 40px
    );
`
const AvatarNavBarItem = styled.div`
    svg {
        cursor: pointer;
        color: white;
        font-size: 1.4rem;
        margin-top: 4px;
        font-weight: bold;
    }
`
const OnlineStatusCircle = styled.div`
    border: 3px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    height: 10px;
    background: #aeb5bc;
    width: 10px;
    z-index: 1;
`
const CheckFullDesc = styled.div`
    color: #0096b2;
    font-size: 14px;
    font-weight: 500;
    margin-top: 7px;
    cursor: pointer;
`
const CheckFullLanguages = styled.div`
    border-bottom: 1px dotted hsla(210, 5%, 48%, 0.5);
    color: #8194a7;
    cursor: pointer;
    margin-left: 4px;
    font-size: 15px;
`
type Props = {
    addTeachertoRef: (teacherRef: any) => void
    teacher: User
    hoverHandle: (teacherIndex: number) => void
    index: number
    isFirstCard: boolean
}

function TeacherCard({
    addTeachertoRef,
    teacher,
    hoverHandle,
    index,
    isFirstCard,
}: Props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [BookModal, setBookModal] = useState(false)
    const [DescriptionOpen, setDescriptionOpen] = useState(false)
    const [LanguagesOpen, setLanguagesOpen] = useState(false)
    const navigate = useNavigate()
    const [favoriteSvgHover, setFavoriteSvgHover] = useState(false)
    const User = useAppSelector((state) => state.user.User)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isFirstCard) {
            hoverHandle(index)
        }
    }, [])

    function addToFavorite() {
        if (User !== null) {
            dispatch(AddToFavorite(teacher._id))
           
        } else {
            //fix- add modal for login
            navigate('/login')
        }
    }
    function removeFromFavorite() {
        dispatch(RemoveFromFavorite(teacher._id))
    }
    function BookClick() {
        if (User !== null) {
            setBookModal(true)
        } else {
            //fix- add modal for login
            navigate('/login')
        }
    }
    function SendMessage() {
        if (User !== null) {
            setModalOpen(true)
        } else {
            //fix- add modal for login
            navigate('/login')
        }
    }
    return (
        <TeacherCardWrapper
            ref={addTeachertoRef}
            onMouseEnter={(e) => {
                hoverHandle(index)
            }}
        >
            <Flex gap={'15px'} style={{ flexWrap: 'wrap' }}>
                <Photo>
                    <img src={teacher.photo} alt="teacher" />
                    <AvatarNavBar>
                        <AvatarNavBarItem>
                            <OnlineStatusCircle />
                        </AvatarNavBarItem>
                        <AvatarNavBarItem
                            onClick={() =>
                                teacher.inFavorite
                                    ? removeFromFavorite()
                                    : addToFavorite()
                            }
                            onMouseEnter={() => setFavoriteSvgHover(true)}
                            onMouseLeave={() => setFavoriteSvgHover(false)}
                        >
                            {teacher.inFavorite ? (
                                <BiSolidHeart />
                            ) : favoriteSvgHover ? (
                                <BiSolidHeart />
                            ) : (
                                <BiHeart />
                            )}
                        </AvatarNavBarItem>
                    </AvatarNavBar>
                </Photo>
                <TopBar>
                    <div>
                        <Name target='_blank' to={`/teacher/${teacher._id}`}>
                            {teacher.name} {teacher.surname[0]}.
                            <ReactCountryFlag
                                countryCode={teacher?.country}
                                style={{
                                    marginLeft: '10px',
                                    fontSize: '0.9rem',
                                }}
                                svg
                            />
                        </Name>
                        <TeachesLanguage>
                            <PiStudentLight fontSize={'1.3rem'} />
                            <span>Japanese</span>
                        </TeachesLanguage>
                    </div>
                    <TeacherShort>
                        <Flex justify="flex-start" gap={'8px'} align="center">
                            <NewUserLabel>Recently on the platform</NewUserLabel>
                            <LessonInfo>
                                <LessonPrice>
                                    {teacher.price}
                                    <span>$</span>
                                </LessonPrice>
                                <LessonLength>50 minute</LessonLength>
                            </LessonInfo>
                        </Flex>
                    </TeacherShort>
                </TopBar>
                <BottomBar>
                    <BottomBarText>
                        <DescriptionContainer>
                            <Text color="#8194A7" fz="14px">
                                Speaks at:
                            </Text>
                            {teacher.languages.map((el: any, index) =>
                                LanguagesOpen ? (
                                    <Flex
                                        key={index}
                                        justify="center"
                                        align="center"
                                        gap="5px"
                                    >
                                        <Language>{getLabel(el.language)}</Language>
                                        <LanguageLevel>
                                            {el.level}
                                        </LanguageLevel>
                                    </Flex>
                                ) : (
                                    index < 2 && (
                                        <Flex
                                            key={index}
                                            justify="center"
                                            align="center"
                                            gap="5px"
                                        >
                                            <Language>{getLabel(el.language)}</Language>
                                            <LanguageLevel>
                                                {el.level}
                                            </LanguageLevel>
                                        </Flex>
                                    )
                                )
                            )}
                            {teacher.languages.length > 2 && (
                                <CheckFullLanguages
                                    onClick={() =>
                                        setLanguagesOpen(!LanguagesOpen)
                                    }
                                >
                                    {LanguagesOpen
                                        ? 'x'
                                        : `+${teacher.languages.length - 2}`}
                                </CheckFullLanguages>
                            )}
                        </DescriptionContainer>
                        <Header DescriptionOpen={DescriptionOpen}>
                            <span>{teacher.description.header}</span>
                            <Interests>
                                {teacher.description.interests}
                            </Interests>
                        </Header>
                        <CheckFullDesc
                            onClick={() => setDescriptionOpen(!DescriptionOpen)}
                        >
                            {DescriptionOpen ? 'Hide' : 'Read more'}
                        </CheckFullDesc>
                    </BottomBarText>
                    <ButtonsContainer>
                        <BookLesson onClick={() => BookClick()}>
                        Book a trial lesson
                        </BookLesson>
                        <SendMessageButton onClick={() => SendMessage()}>
                            <span style={{ textAlign: 'center' }}>
                                {window.innerWidth > 400 ? (
                                    'Send a message'
                                ) : (
                                    <AiOutlineMessage fontSize={'1.5rem'} />
                                )}
                            </span>
                        </SendMessageButton>
                    </ButtonsContainer>
                </BottomBar>
            </Flex>

            {modalOpen &&
                createPortal(
                    <SendMessageModal
                        avatarSrc={teacher.photo}
                        name={teacher.name}
                        setModalOpen={setModalOpen}
                        teacherId={teacher._id}
                    />,
                    document.body
                )}

            {BookModal &&
                createPortal(
                    <BookLessonModal
                        setBookModal={setBookModal}
                        avatarSrc={teacher.photo}
                        schedule={teacher.schedule}
                    />,
                    document.body
                )}
        
        </TeacherCardWrapper>
    )
}

export default TeacherCard
