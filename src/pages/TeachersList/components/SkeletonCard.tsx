import styled, { keyframes } from 'styled-components'
import { Flex } from '../../../components/Common'

const load = keyframes`
from {
    left: -150px;
}
to   {
    left: 100%;
}
`
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
    width: 150px;
    height: 150px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    position: relative;
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
const Name = styled.div`
    font-family: Inter;
    width: 160px;
    height: 20px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    font-weight: 500;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1.1rem;
    color: black;
`
const NewUserLabel = styled.div`
    height: 70px;

    min-width: 180px;
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
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    height: 20px;
    width: 100px;
    display: flex;
    align-items: center;
    margin-top: 3px;
    opacity: 0.8;
    font-family: Inter;
    font-size: 0.9rem;
`
const LessonInfo = styled.div`
    display: flex;
    background:green;
    flex: 1,
    min-width: 100px;
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
const Header = styled.div`
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    min-width: 70%;
    border-radius: 10px;
    height: 100px;
    word-break: break-all;
    overflow: hidden;
    span {
        font-weight: 500;
        color: #090f19;
    }
`

const SendMessageButton = styled.button`
    width: 100%;
    height: 60px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    border-radius: 10px;
    border: none;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    color: #090F1;
    display: flex;
    padding: 0px 10px;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;

    @media (max-width: 400px) {
        width: 15%;
        height: 45px;
    }
`

const BookLesson = styled.button`
    width: 100%;
    height: 60px;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    font-family: Inter;
    text-align: center;
    font-size: 0.9rem;
    color: white;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
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
    width: 100%;
    font-family: Inter;
    justify-content: space-between;
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
const TeacherShortFlex = styled.div`
    display: flex;
    jutify-content: flex-start;
    gap: 8px;
    align-items: center;
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
`
const DescriptionContainer = styled.div`
    background: #dbdbdb;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${load} 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    width: 140px;
    height: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    gap: 5px;
    @media (max-width: 720px) {
        margin: 20px 0px 10px;
    }
`

const ButtonsContainer = styled.div`
    min-width: 32%;
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

type Props = {}

function SkeletonCard({}: Props) {
    return (
        <TeacherCardWrapper>
            <Flex gap={'15px'} style={{ flexWrap: 'wrap' }}>
                <Photo></Photo>
                <TopBar>
                    <div>
                        <Name></Name>
                        <TeachesLanguage></TeachesLanguage>
                    </div>
                    <TeacherShort>
                        <TeacherShortFlex>
                            <NewUserLabel></NewUserLabel>
                            <LessonInfo>
                                <LessonPrice></LessonPrice>
                                <LessonLength></LessonLength>
                            </LessonInfo>
                        </TeacherShortFlex>
                    </TeacherShort>
                </TopBar>
                <BottomBar>
                    <BottomBarText>
                        <DescriptionContainer></DescriptionContainer>
                        <Header></Header>
                    </BottomBarText>
                    <ButtonsContainer>
                        <BookLesson></BookLesson>
                        <SendMessageButton>
                            <span style={{ textAlign: 'center' }}></span>
                        </SendMessageButton>
                    </ButtonsContainer>
                </BottomBar>
            </Flex>
        </TeacherCardWrapper>
    )
}

export default SkeletonCard
