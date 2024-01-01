import styled from 'styled-components'

import { Box, Flex, Text } from '../../../components/Common'
import {
    BsBookmark,
    BsLightningCharge,
    BsPersonCircle,
    BsShieldCheck,
} from 'react-icons/bs'
import { TfiMedallAlt, TfiWorld } from 'react-icons/tfi'
import { FiMapPin, FiTarget } from 'react-icons/fi'
import { PiGraduationCap } from 'react-icons/pi'
import { BiTimeFive } from 'react-icons/bi'

const Wrapper = styled.div`
    width: 100%;
    margin-top: 50px;
    background: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    padding: 48px 0px 48px;
`
const TopBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const HeaderTextContainer = styled.div`
    max-width: 520px;
    box-sizing: border-box;
    padding: 0px 16px;
`
const TextHeader = styled.div`
    color: #384047;
    margin: 0px 0px 15px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    @media (max-width: 640px) {
        font-size: 24px;
    }
`
const TextSub = styled.div`
    color: #6f757b;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    @media (max-width: 640px) {
        font-size: 16px;
    }
`
const TopContent = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    @media (max-width: 781px) {
        flex-direction: column;
        gap: 20px;
    }
`
const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15px;
    width: 264px;
    align-items: center;
    @media (max-width: 781px) {
        width: 100%;
    }
`

const ItemHeader = styled.div`
    colo: #384047;
    font-size: 18px;
    margin: 5px 0px;
    font-weight: 500;
    text-align: center;
    @media (max-width: 781px) {
        font-size: 20px;
    }
`
const ItemSub = styled.div`
    text-align: center;
    color: #6f757b;
    font-size: 14px;
    @media (max-width: 781px) {
        font-size: 16px;
    }
`

const IconItem = styled.div`
    min-width: 48px;
    min-height: 48px;
    border-radius: 50%;
    background: #f0f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        color: #3bb3bd;
    }
`
const BottomContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 781px) {
        flex-direction: column;
        gap: 20px;
    }
`
const BottomItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 48px;
    gap: 30px;
    @media (max-width: 781px) {
        padding: 0px 20px;
        gap: 20px;
    }
    @media (max-width: 500px) {
        padding: 0px 10px;
        gap: 20px;
    }
`
const HeaderIcon = styled.div<{ fill?: boolean; border?: boolean }>`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: ${(props) => (props.fill ? '#3bb3bd' : 'white')};
    border: ${(props) => (props.border ? '2px solid #f4f4f4' : 'none')};
    position: absolute;
    display: flex;
    left: 50%;
    margin-left: -35px;
    top: -35px;
    align-items: center;
    justify-content: center;
    svg {
        color: ${(props) => (props.fill ? 'white' : '#54bdc5')};
        font-size: 2rem;
    }
`
const Separator = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin: 70px 0px;
    &:before {
        content: '';
        width: 100%;
        height: 2px;
        background: #f4f4f4;
        position: absolute;
        left: 0;
    }
`

function About() {
    return (
        <Wrapper>
            <HeaderIcon fill>
                <TfiWorld />
            </HeaderIcon>
            <TopBar>
                <HeaderTextContainer>
                    <TextHeader>
                        Make the whole world your comfort zone
                    </TextHeader>
                    <TextSub>
                        Study on Japl with the best tutors from 185 countries
                    </TextSub>
                </HeaderTextContainer>
            </TopBar>
            <Box padding="0px 32px" margin="30px 0px 0px ">
                <TopContent>
                    <Item>
                        <IconItem>
                            <TfiMedallAlt fontSize={'1.6rem'} />
                        </IconItem>
                        <ItemHeader>Experienced tutors</ItemHeader>
                        <ItemSub>
                            Study with native speakers and professional teachers
                        </ItemSub>
                    </Item>
                    <Item>
                        <IconItem>
                            <BsShieldCheck fontSize={'1.3rem'} />
                        </IconItem>
                        <ItemHeader>Safe communication</ItemHeader>
                        <ItemSub>
                            We verify each tutor&apos;s profile on the platform
                        </ItemSub>
                    </Item>
                    <Item>
                        <IconItem>
                            <BsPersonCircle fontSize={'1.4rem'} />
                        </IconItem>
                        <ItemHeader>Flexible schedule</ItemHeader>
                        <ItemSub>
                            Study at your own pace, choosing a convenient time
                            for the lessons
                        </ItemSub>
                    </Item>
                    <Item>
                        <IconItem>
                            <FiTarget fontSize={'1.4rem'} />
                        </IconItem>
                        <ItemHeader>Affordable prices</ItemHeader>
                        <ItemSub>
                            On the platform, you&apos;ll find a tutor for every
                            budget
                        </ItemSub>
                    </Item>
                </TopContent>
            </Box>
            <Separator>
                <HeaderIcon fill={false} border>
                    <PiGraduationCap />
                </HeaderIcon>
            </Separator>
            <Flex justify="center">
                <HeaderTextContainer>
                    <TextHeader>Work on specific skills</TextHeader>
                    <TextSub>
                        Our tutors can help you achieve any goal you have
                    </TextSub>
                </HeaderTextContainer>
            </Flex>
            <Box margin="50px 0px 0px">
                <BottomContent>
                    <BottomItem>
                        <Flex gap="20px" align="center">
                            <IconItem>
                                <BsBookmark fontSize={'1.4rem'} />
                            </IconItem>
                            <div>
                                <Text
                                    margin="0px 0px 5px 0px"
                                    color="#384047"
                                    fz="18px"
                                    fw="500"
                                >
                                    Immerse yourself in learning a new culture
                                </Text>
                                <Text color="#6F757B" fz="15px">
                                    Communicate freely with people from all over
                                    the world
                                </Text>
                            </div>
                        </Flex>
                        <Flex gap="20px" align="center">
                            <IconItem>
                                <BiTimeFive fontSize={'1.7rem'} />
                            </IconItem>
                            <div>
                                <Text
                                    margin="0px 0px 5px 0px"
                                    color="#384047"
                                    fz="18px"
                                    fw="500"
                                >
                                    Discuss different topics with your tutors
                                </Text>
                                <Text color="#6F757B" fz="15px">
                                    Our experts will always be there to help you
                                </Text>
                            </div>
                        </Flex>
                    </BottomItem>
                    <BottomItem>
                        <Flex gap="20px" align="center">
                            <IconItem>
                                <BsLightningCharge fontSize={'1.7rem'} />
                            </IconItem>
                            <div>
                                <Text
                                    margin="0px 0px 5px 0px"
                                    color="#384047"
                                    fz="18px"
                                    fw="500"
                                >
                                    Build a career and achieve success
                                </Text>
                                <Text color="#6F757B" fz="15px">
                                    Develop your professional vocabulary
                                </Text>
                            </div>
                        </Flex>
                        <Flex gap="20px" align="center">
                            <IconItem>
                                <FiMapPin fontSize={'1.7rem'} />
                            </IconItem>
                            <div>
                                <Text
                                    margin="0px 0px 5px 0px"
                                    color="#384047"
                                    fz="18px"
                                    fw="500"
                                >
                                    Learn to speak boldly and naturally
                                </Text>
                                <Text color="#6F757B" fz="15px">
                                    Speak confidently in any language
                                </Text>
                            </div>
                        </Flex>
                    </BottomItem>
                </BottomContent>
            </Box>
        </Wrapper>
    )
}

export default About
