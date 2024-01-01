import React from 'react'
import { Flex, Text } from '../../../components/Common'
import { BsCircle } from 'react-icons/bs'
import styled from 'styled-components'
import { AiOutlineCheck } from 'react-icons/ai'
import WelcomeImage from '../../../assets/images/WelcomeImg.jpg'
const WelcomContainer = styled.div`
    width: 100%;

    background: white;
    box-shadow: 0 0.225rem 0.25rem #00000014;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 32px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ImgContainer = styled.div`
    width: 350px;
    max-height: 200px;
    border-radius: 15px;
    overflow: hidden;
    img {
        width: 100%;
    }
    @media (max-width: 900px) {
        width: 230px;
        max-height: 100%;
    }
    @media (max-width: 768px) {
        width: 180px;
        max-height: 100%;
    }
    @media (max-width: 700px) {
        display: none;
    }
`

function Welcome() {
    return (
        <WelcomContainer>
            <div style={{ height: '100%' }}>
                <Text
                    color="#2E3856"
                    fz={'26px'}
                    fw={'bold'}
                    style={{ marginBottom: '30px' }}
                >
                    Welcome to Japl!
                </Text>
                <Flex direction="column" gap={'20px'}>
                    <Flex align="center" gap={'10px'}>
                        <AiOutlineCheck color="#59e8b5" />
                        <Text
                            color="#30374b"
                            fw={'bold'}
                            fz={'17px'}
                            style={{
                                lineHeight: '1.5',
                                letterSpacing: 'normal',
                            }}
                        >
                            Create an account
                        </Text>
                    </Flex>
                    <Flex align="center" gap={'10px'}>
                        <AiOutlineCheck color="#59e8b5" />
                        <Text
                            color="#30374b"
                            fw={'bold'}
                            fz={'17px'}
                            style={{
                                lineHeight: '1.5',
                                letterSpacing: 'normal',
                            }}
                        >
                            Create or find training modules
                        </Text>
                    </Flex>
                    <Flex align="center" gap={'10px'}>
                        <BsCircle color="#59e8b5" />
                        <Text
                            color="#30374b"
                            fw={'bold'}
                            fz={'17px'}
                            style={{
                                lineHeight: '1.5',
                                letterSpacing: 'normal',
                            }}
                        >
                            Explore collections in modes
                            <Text inline color="#4255FF" fw={'bold'}>
                                {' '}
                                Cards
                            </Text>{' '}
                            or{' '}
                            <Text color="#4255FF" fw={'bold'}>
                                Memorization
                            </Text>
                        </Text>
                    </Flex>
                </Flex>
            </div>
            <ImgContainer>
                <img src={WelcomeImage} />
            </ImgContainer>
        </WelcomContainer>
    )
}

export default Welcome
