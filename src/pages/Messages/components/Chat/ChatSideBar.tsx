import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '../../../../components/Common'
import { User } from '../../../../types/User/UserTypes'
import { BsLightningChargeFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { BiHeart } from 'react-icons/bi'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import DefaultAvatar from '../../../../assets/images/DefaultAvatar.png'
import Paypal from '../../../../assets/images/PayPal.png'
import Visa from '../../../../assets/images/Visa.png'
import MasterCard from '../../../../assets/images/Mastercard.png'
const Wrapper = styled.div`
    width: 100%;
    width: 450px;
    border-left: 1px solid #d8dfe6;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    @media (max-width: 1350px) {
        width: 350px;
    }
    @media (max-width: 1049px) {
        width: 100%;
    }
`
const SideBarTop = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 12px 24px;
`

const Avatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 30px;
        height: 30px;
    }
`
const Price = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const BookGuide = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 2;
    box-sizing: border-box;
    padding: 0px 24px;
`
const StepCircle = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(59, 179, 189);
    margin-top: 3px;
    font-size: 12px;
    min-width: 20px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
`
const SideBarBottom = styled.div`
    min-height: 60px;
    box-sizing: border-box;
    padding: 10px 24px 5px;
    border-top: 1px solid #d8dfe6;
`
const Iconscontainer = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 5px;
`
const Logo = styled.div`
    width: 50px;
    height: 15px;
    img {
        width: 50px;
        height: auto;
    }
`
const Button = styled.div`
    width: 100%;
    height: 40px;
    cursor: pointer;
    border: 1px solid #3bb3bd;
    color: white;
    border-radius: 15px;
    background: #3bb3bd;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    font-family: Inter;
    font-size: 0.95rem;
    font-weight: 500;
    gap: 10px;
    svg {
        color: #fdc425;
    }
`
const ButtonToFavorite = styled.div`
    width: 100%;
    height: 40px;
    cursor: pointer;
    color: #090f19;
    border-radius: 15px;
    background: #f7f5f2;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    font-family: Inter;
    font-size: 0.95rem;
    font-weight: 500;
    gap: 10px;
    svg {
        color: #090f19;
    }
`
const TopBar = styled.div`
    min-height: 60px;
    border-bottom: 1px solid #d8dfe6;
    display: flex;
    gap: 10px;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 12px;
    @media (min-width: 1050px) {
        display: none;
    }
`
const PrevButton = styled.div`
    width: 40px;
    height: 40px;
    background: #f7f5f2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
`
type Props = {
    currentFriend: User
    setSideBarOpen: Dispatch<SetStateAction<boolean>>
}

function ChatSideBar({ currentFriend, setSideBarOpen }: Props) {
    const navigate = useNavigate()
    return (
        <Wrapper>
            <TopBar>
                <PrevButton onClick={() => setSideBarOpen(false)}>
                    <IoIosArrowBack />
                </PrevButton>
                <Text color="#090F19" fz="14px">
                    Chat
                </Text>
            </TopBar>
            <SideBarTop>
                <Flex align="center" gap={'10px'}>
                    <Avatar>
                        <img
                            src={
                                currentFriend?.photo ||
                                DefaultAvatar
                            }
                        />
                    </Avatar>
                    <div>
                        <Text color="#006987" fz={'1.3rem'} fw={'bold'}>
                            {currentFriend?.name}
                            <FaExternalLinkAlt
                                style={{ marginLeft: '10px' }}
                                fontSize={'1rem'}
                            />
                        </Text>
                        <Flex gap={'2px'}>
                            <AiFillStar fontSize={'1.1rem'} color="#fdc425" />
                            <AiFillStar fontSize={'1.1rem'} color="#fdc425" />
                            <AiFillStar fontSize={'1.1rem'} color="#fdc425" />
                            <AiFillStar fontSize={'1.1rem'} color="#fdc425" />
                            <AiFillStar fontSize={'1.1rem'} color="#fdc425" />
                        </Flex>
                    </div>
                </Flex>
                <div>
                    <Price>
                        <Text color="#384047" fz={'1.4rem'} fw={'500'}>
                            $ {currentFriend?.price}
                        </Text>
                        <Text color="#384047" fz={'1rem'}>
                        per lesson
                        </Text>
                    </Price>
                </div>
            </SideBarTop>
            <BookGuide>
                <Flex gap={'10px'}>
                    <StepCircle>1</StepCircle>
                    <div>
                        <Text color="#384047" fw={'500'}>
                            Pick time
                        </Text>
                        <Text color="#6F757B" fz={'1rem'}>
                        Choose a convenient time and day for your first lesson
                        </Text>
                    </div>
                </Flex>
                <Flex gap={'10px'}>
                    <StepCircle>2</StepCircle>
                    <div>
                        <Text color="#384047" fw={'500'}>
                        Make payment
                        </Text>
                        <Text color="#6F757B" fz={'1rem'}>
                        Use reliable payments PayPal or
                            Visa/Mastercard
                        </Text>
                        <Iconscontainer>
                            <Logo>
                                <img
                                    src={Paypal}
                                />
                            </Logo>
                            <Logo>
                                <img
                                    src={Visa}
                                />
                            </Logo>
                            <Logo>
                                <img
                                    style={{ width: '35px' }}
                                    src={MasterCard}
                                />
                            </Logo>
                        </Iconscontainer>
                    </div>
                </Flex>
                <Flex gap={'10px'}>
                    <StepCircle>3</StepCircle>
                    <div>
                        <Text color="#384047" fw={'500'}>
                        Use Japl video calls
                        </Text>
                        <Text color="#6F757B" fz={'1rem'}>
                        Study with a tutor on our video platform
                        </Text>
                    </div>
                </Flex>
            </BookGuide>
            <SideBarBottom>
                <Button
                    onClick={() => navigate(`/teacher/${currentFriend?._id}`)}
                >
                    <BsLightningChargeFill />
                    Book a lesson
                </Button>
                <ButtonToFavorite
                    onClick={() => navigate(`/teacher/${currentFriend?._id}`)}
                >
                    <BiHeart />
                    Add to favorites
                </ButtonToFavorite>
            </SideBarBottom>
        </Wrapper>
    )
}

export default ChatSideBar
