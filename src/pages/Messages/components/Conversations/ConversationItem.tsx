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
    width: 100%;
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
    setCurrentView: Dispatch<SetStateAction<'chat' | 'conversations'>>
}

function ConversationItem({
    setCurrentChat,
    conversations,
    currentId,
    setCurrentView,
}: Props) {
    const [currentFriend, setCurrentFriend] = useState<User>()
    const [lastMessage, setLastMessage] = useState<any>('')
    const [isLoaded, setLoaded] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        const friendId = conversations.members.find(
            (id: string) => id !== currentId
        )
        dispatch(GetConversationFriend(friendId!)).then((res) => {
            setLastMessage(res.payload.lastMessage)
            setCurrentFriend(res.payload.friend)
            setLoaded(true)
        })
    }, [])
    function handleClick() {
        setCurrentChat(conversations)
        setCurrentView('chat')
    }
    return (
        <Wrapper onClick={() => handleClick()}>
            {isLoaded && (
                <FriendItem>
                    <Avatar>
                        <img src={currentFriend?.photo || DefaultAvatar} />
                    </Avatar>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                        }}
                    >
                        <Flex justify="space-between" style={{ width: '100%' }}>
                            <Text fw={'500'} color="#384047" fz={'14px'}>
                                {currentFriend?.name} {currentFriend?.surname}
                            </Text>
                            <Text color="#AEB5BC" fz="12px">
                                {new Date(lastMessage.time).toLocaleDateString(
                                    'de-DE'
                                )}
                            </Text>
                        </Flex>
                        <Text
                            color="#6F757B"
                            fz={'14px'}
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                padding: '0px 15px 0px 0px',
                            }}
                        >
                            {lastMessage.text || 'Нет сообщений'}
                        </Text>
                    </div>
                </FriendItem>
            )}
        </Wrapper>
    )
}

export default ConversationItem
