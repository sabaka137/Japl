import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { PiStudentBold } from 'react-icons/pi'

import Student from '../../../assets/images/Landing/student.jpg'

const Wrapper = styled.div`
    width: 100%;
    margin-top: 60px;
    background: #fff;
    border-radius: 4px;
    padding: 0px 0px 48px 0px;
    box-sizing: border-box;
    position: relative;
    @media (max-width: 640px) {
        padding: 0px 0px 16px 0px;
    }
`
const ImgContainer = styled.div`
    border-radius: 4px 4px 0px 0px;
    display: block;
    height: 400px;
    overflow: hidden;
    width: 100%;
    img {
        height: 100%;
        object-fit: cover;

        object-position: center center;

        width: 100%;
    }
    @media (max-width: 781px) {
        height: 320px;
    }
    @media (max-width: 480px) {
        height: 160px;
    }
    @media (max-width: 350px) {
        height: 130px;
    }
`
const HeaderTextContainer = styled.div`
    max-width: 520px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0px 16px;
`
const Content = styled.div`
    display: flex;
    justify-content: center;
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
const Separator = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 40px;
`
const SeparatorIcon = styled.div`
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
    border: 2px solid #f4f4f4;
    svg {
        font-size: 2rem;
        color: #3bb3bd;
    }
`
const Button = styled(NavLink)`
    background: rgb(59, 179, 189);
    border: 1px solid rgb(59, 179, 189);
    border-radius: 2px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    font-size: 16px;
    margin-top: 25px;
    font-weight: 500;
    width: 230px;
    outline: 0px;
    overflow: hidden;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    @media (max-width: 640px) {
        width: 100%;
        padding: 15px 0px;
    }
`

function StudentBlock() {
    return (
        <Wrapper>
            <ImgContainer>
                <img src={Student} />
            </ImgContainer>
            <Separator>
                <SeparatorIcon>
                    <PiStudentBold />
                </SeparatorIcon>
            </Separator>
            <Content>
                <HeaderTextContainer>
                    <TextHeader>
                        Hundreds of thousands of students join us every month
                    </TextHeader>
                    <TextSub>
                        ...and achieve their learning objectives. With
                        experienced tutors, your goals will be closer than ever!
                    </TextSub>
                    <Button to={'/login'}>Start training</Button>
                </HeaderTextContainer>
            </Content>
        </Wrapper>
    )
}

export default StudentBlock
