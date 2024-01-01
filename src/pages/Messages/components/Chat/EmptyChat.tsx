import React from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import styled from 'styled-components'
import { Text } from '../../../../components/Common'
const Wrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Circle = styled.div`
border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 16px;
    height: 32px;
    width: 32px;
    border: 2px solid rgb(238, 249, 250);
}
`

function EmptyChat() {
    return (
        <Wrapper>
            <Circle>
                <AiOutlineFile color="#3bb3bd" fontSize={'1.25rem'} />
            </Circle>
            <Text color="#6F757B" fz="15px">
                Select a tutor to start{' '}
            </Text>
            <Text color="#6F757B" fz="15px">
                conversation
            </Text>
        </Wrapper>
    )
}

export default EmptyChat
