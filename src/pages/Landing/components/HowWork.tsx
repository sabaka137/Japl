import styled from 'styled-components'

import { FiCompass } from 'react-icons/fi'
import { Flex, Text } from '../../../components/Common'

import firstStep from '../../../assets/images/Landing/step-1.png'
import secondStep from '../../../assets/images/Landing/step-2.png'
import thirdStep from '../../../assets/images/Landing/step-3.png'
import fourthStep from '../../../assets/images/Landing/step-4.png'
import Shield from '../../../assets/images/Landing/Shield.png'

const Wrapper = styled.div`
    width: 100%;
    margin-top: 70px;
    background: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    padding: 48px 0px 48px;
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
        font-size: 2.3rem;
    }
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
const Content = styled.div`
    margin: 40px 0px 0px;
    box-sizing: border-box;
    padding: 0px 16px;
`
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 16px 7px;
    @media (max-width: 781px) {
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #eef0f2;
        gap: 10px;
        &:last-child {
            border-bottom: none;
        }
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
    font-size: 1.4rem;
    font-weight: 500;
    color: #3bb3bd;
    @media (max-width: 781px) {
    }
`
const ImgContainer = styled.div`
    max-width: 494px;
    width: 50%;
    img {
        max-width: 494px;
        width: 100%;
    }
    @media (max-width: 781px) {
        width: 100%;
    }
`

const HeaderTextContainer = styled.div`
    max-width: 520px;
    box-sizing: border-box;
    padding: 0px 16px;
`
const TextContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    width: 50%;
    @media (max-width: 781px) {
        width: 100%;
        text-align: center;
        flex-direction: column;
        gap: 5px;
    }
`

const LargeText = styled.div`
    margin: 0px 0px 5px 0px;
    color: #384047;
    font-size: 18px;
    font-weight: 500;
    @media (max-width: 781px) {
        text-align: center;
    }
`
const SmallText = styled.div`
    color: #6f757b;
    font-size: 15px;
    @media (max-width: 781px) {
        text-align: center;
    }
`

const Separator = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin: 70px 0px 40px;
    &:before {
        content: '';
        width: 100%;
        height: 2px;
        background: #f4f4f4;
        position: absolute;
        left: 0;
    }
`
const SeparatorImg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: white;
    position: absolute;
    display: flex;
    left: 50%;
    margin-left: -35px;
    top: -35px;
    align-items: center;
    justify-content: center;
    img {
        width: 70px;
        height: 70px;
    }
`
const BottomBar = styled.div`
box-sizing:border:box;
padding:16px 32px;
display:flex;
justify-content:center;
`

export default function HowWork() {
    return (
        <Wrapper>
            <HeaderIcon fill>
                <FiCompass />
            </HeaderIcon>
            <Flex justify="center">
                <HeaderTextContainer>
                    <TextHeader>How Japl works</TextHeader>
                    <TextSub>
                        Study online with the best teachers in the world
                    </TextSub>
                </HeaderTextContainer>
            </Flex>
            <Content>
                <Item>
                    <TextContainer>
                        <IconItem>1</IconItem>
                        <div>
                            <LargeText>Find the best tutor</LargeText>
                            <SmallText>
                                Choose from over 32,000 tutors. Use the filters
                                to narrow your search and find the perfect tutor
                            </SmallText>
                        </div>
                    </TextContainer>
                    <ImgContainer>
                        <img src={firstStep} />
                    </ImgContainer>
                </Item>
                <Item>
                    <TextContainer>
                        <IconItem>2</IconItem>
                        <div>
                            <LargeText>Study anytime</LargeText>
                            <SmallText>
                                Find the perfect time in your schedule. Book
                                lessons instantly from your computer or mobile
                            </SmallText>
                        </div>
                    </TextContainer>
                    <ImgContainer>
                        <img src={secondStep} />
                    </ImgContainer>
                </Item>
                <Item>
                    <TextContainer>
                        <IconItem>3</IconItem>
                        <div>
                            <LargeText>Use our video platform</LargeText>
                            <SmallText>
                                When it&apos;s time for a lesson, connect with
                                your tutor using the full video platform
                            </SmallText>
                        </div>
                    </TextContainer>
                    <ImgContainer>
                        <img src={thirdStep} />
                    </ImgContainer>
                </Item>
                <Item>
                    <TextContainer>
                        <IconItem>4</IconItem>
                        <div>
                            <LargeText>
                                All the benefits of systemic training
                            </LargeText>
                            <SmallText>
                                Track your progress in your studies. Improve
                                speaking skills and vocabulary with the help of
                                Learning plans
                            </SmallText>
                        </div>
                    </TextContainer>
                    <ImgContainer>
                        <img src={fourthStep} />
                    </ImgContainer>
                </Item>
            </Content>
            <Separator>
                <SeparatorImg>
                    <img src={Shield} />
                </SeparatorImg>
            </Separator>
            <BottomBar>
                <div style={{ width: '520px' }}>
                    <Text color="#374047" fz="18px" fw="500" align="center">
                        100% Satisfaction Guarantee
                    </Text>
                    <Text color="#6f757b" fz="15px" align="center">
                        If you don&apos;t like your trial lesson, we will offer
                        you a free lesson with another tutor or a refund. money
                    </Text>
                </div>
            </BottomBar>
        </Wrapper>
    )
}
