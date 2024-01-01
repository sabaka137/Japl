import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { Box, Text } from '../../../components/Common'
import {
    AiOutlineCalendar,
    AiOutlineDollarCircle,
    AiOutlineSearch,
} from 'react-icons/ai'

import BecomeTeacher from '../../../assets/images/Landing/become-a-teacher.jpg'

const Wrapper = styled.div`
    width: 100%;
    margin-top: 50px;
    background: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
`
const Container = styled.div`
    display: flex;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`

const TextHeader = styled.div`
    color: #384047;
    margin: 0px 0px 15px;
    font-size: 32px;
    font-weight: 500;
    @media (max-width: 640px) {
        font-size: 24px;
    }
`
const TextSub = styled.div`
    color: #6f757b;
    font-weight: 500;
    font-size: 18px;
    @media (max-width: 640px) {
        font-size: 16px;
    }
`
const Content = styled.div`
    box-sizing: border-box;
    padding: 48px 32px 32px;
    width: 55%;

    @media (max-width: 960px) {
        order: 2;
        width: 100%;
        padding: 32px;
    }
    @media (max-width: 781px) {
        padding: 16px;
    }
`
const StepItem = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 7px;
    svg {
        color: #54bdc5;
        font-size: 1.6rem;
    }
`
const Button = styled(NavLink)`
    background: rgb(59, 179, 189);
    border: 1px solid rgb(59, 179, 189);
    border-radius: 2px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    margin-top: 16%;
    font-weight: 500;
    line-height: 1;
    margin-right: 32px;
    box-sizingb: border-box;
    max-width: 100%;
    outline: 0px;
    overflow: hidden;
    padding: 15px 30px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition:
        color 50ms ease 0s,
        background-color 50ms ease 0s,
        border-color 50ms ease 0s,
        box-shadow 0.2s ease 0s;
    user-select: none;
    vertical-align: middle;
    @media (max-width: 960px) {
        margin-top: 2%;
    }
    @media (max-width: 640px) {
        width: 100%;
        padding: 15px 0px;
    }
`

const ImgContainer = styled.div`
    overflow: hidden;
    max-width: 45%;
    img {
        height: 100%;
    }
    @media (max-width: 960px) {
        height: 450px;
        max-width: 100%;
        order: 1;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
    @media (max-width: 781px) {
        height: 320px;
    }
    @media (max-width: 480px) {
        height: 180px;
    }
`

function TeacherBlock() {
    return (
        <Wrapper>
            <Container>
                <Content>
                    <TextHeader>Become a tutor on Japl</TextHeader>
                    <TextSub>
                        Share your knowledge and earn from the comfort of your
                        home. Sign up to start teaching on Japl.
                    </TextSub>
                    <Box margin="25px 0px 0px">
                        <StepItem>
                            <AiOutlineSearch />
                            <Text color="#090F19" fz="15px">
                                Find new students
                            </Text>
                        </StepItem>
                        <StepItem>
                            <AiOutlineCalendar />
                            <Text color="#090F19" fz="15px">
                                Develop your own business
                            </Text>
                        </StepItem>
                        <StepItem>
                            <AiOutlineDollarCircle />
                            <Text color="#090F19" fz="15px">
                                Be sure to pay for your lessons
                            </Text>
                        </StepItem>
                    </Box>
                    <Button to={'/signup/teacher'}>Become a tutor</Button>
                </Content>
                <ImgContainer>
                    <img src={BecomeTeacher} />
                </ImgContainer>
            </Container>
        </Wrapper>
    )
}

export default TeacherBlock
