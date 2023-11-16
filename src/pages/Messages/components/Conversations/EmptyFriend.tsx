import React from 'react'
import { Box, Text } from '../../../../components/Common'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import EmptyList from '../../../../assets/images/EmptyFriend.png'
const Wrapper = styled.div`
    width: 70%;
    margin-top:40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        margin-bottom: 20px;
    }
`

const Button = styled(NavLink)`
position: relative;
display: inline-flex;
justify-content: center;
border: 0;
align-items: center;
min-height: 32px;
font-size: 16px;
line-height: 1;
text-decoration: none;
font-weight: 500;
border-radius: 2px;
text-align: center;
text-overflow: ellipsis;
overflow: hidden;
max-width: 100%;
cursor: pointer;
outline: 0;
transition: background-color 50ms;
color: #fff;
background-color: #3bb3bd;
padding: 6px 24px;
`

type Props = {}

function EmptyFriend({}: Props) {
    return (
        <Wrapper>
            <img src={EmptyList} />
            <Text
                margin="0px 0px 7px 0px"
                color="#384047"
                fw="bold"
                fz="17px"
                align="center"
            >
               Ready to start your training?
            </Text>
            <Box w={70} margin='0px 0px 20px 0px'>
                <Text color="#384047" fz="15px" fw="400" align="center">
                Find a tutor and book a lesson to get started
                    to start improving your skills.
                </Text>
            </Box>
            <Button to={'/teachers'}>Find a tutor</Button>
        </Wrapper>
    )
}

export default EmptyFriend
