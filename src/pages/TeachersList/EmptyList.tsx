import React from 'react'
import styled from 'styled-components'
import NothingFound from '../../assets/images/nothing.png'
import { Text } from '../../components/Common'
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const ImageContainer = styled.div`
    width: 400px;
    height: 340px;
    img {
        width: 100%;
        height: auto;
    }
    @media (max-width: 450px) {
        width: 300px;
        height: 240px;
        margin-bottom: 15px;
    }
`
const TitleText = styled.div`
    font-size: 29px;
    font-weight: 800;
    font-family: Inter;
    color: #6499e9;
`
function EmptyList() {
    return (
        <Wrapper>
            <ImageContainer>
                <img src={NothingFound} />
            </ImageContainer>
            <TitleText>No results found</TitleText>
            <Text ff="Noto Sans" color="#5b6e7d" align="center">
                We couldn&apos;t find what you searched for.
            </Text>
        </Wrapper>
    )
}

export default EmptyList
