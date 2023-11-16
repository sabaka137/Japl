import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from '../../../../components/Common'
import { Conversation } from '../../../../types/Chat/ChatTypes'
import { User } from '../../../../types/User/UserTypes'
import { useAppDispatch } from '../../../../hooks/hook'
import { GetConversationFriend } from '../../../../redux/reducers/UserSlice'
import DefaultAvatar from '../../../../assets/images/DefaultAvatar.png'
const Wrapper = styled.div`
    box-sizing: border-box;
`
const Avatar = styled.div`
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 50px;
        height: 50px;
    }
`

const FriendItem = styled.div`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 12px;
    gap: 15px;
    &:hover {
        cursor: pointer;
        background: #f7f5f2;
    }
`
type Props = {
    setCurrentChat: Dispatch<SetStateAction<Conversation | null>>
    conversations: Conversation
    currentId: string
    setCurrentView:Dispatch<SetStateAction<'chat' | 'conversations'>>

}

function ConversationItem({ setCurrentChat, conversations, currentId,setCurrentView }: Props) {
    const [currentFriend, setCurrentFriend] = useState<User>()
    const [lastMessage, setLastMessage] = useState<any>('')
    const dispatch = useAppDispatch()
    useEffect(() => {
        const friendId = conversations.members.find(
            (id: string) => id !== currentId
        )
        dispatch(GetConversationFriend(friendId!)).then((res) => {
            setLastMessage(res.payload.lastMessage)
            setCurrentFriend(res.payload.friend)
     
        })
    }, [])
    function handleClick(){
        setCurrentChat(conversations)
        setCurrentView('chat')
    }
    return (
        <Wrapper onClick={() => handleClick()}>
            <FriendItem>
                <Avatar>
                    <img
                        src={
                            currentFriend?.photo ||
                            DefaultAvatar
                        }
                    />
                </Avatar>
                <Flex style={{ width: '100%' }} justify="space-between">
                    <div>
                        <Text fw={'500'} color="#384047" fz={'14px'}>
                            {currentFriend?.name} {currentFriend?.surname}
                        </Text>
                        <Text color="#6F757B" fz={'14px'}>
                            {lastMessage.text || 'Нет сообщений'}
                        </Text>
                    </div>
                    <div>
                      <Text color='#AEB5BC' fz='12px'>
                      {new Date(lastMessage.time).toLocaleDateString('de-DE')}
                      </Text>
                    </div>
                </Flex>
            </FriendItem>
        </Wrapper>
    )
}

export default ConversationItem
