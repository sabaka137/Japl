import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { GetConversations } from '../../redux/reducers/UserSlice'

import SettingsNavbar from '../../components/SettingsNavbar'
import { ConversationsBox } from './components/Conversations/ConversationsBox'
import { Flex } from '../../components/Common'
import { Chat } from './components/Chat/Chat'
import { Conversation } from '../../types/Chat/ChatTypes'
import EmptyChat from './components/Chat/EmptyChat'
import { ChangeTitle } from '../../utils/ChangeTitle'

export const Messages = () => {
    const [currentChat, setCurrentChat] = useState<Conversation | null>(null)
    const [currentView, setCurrentView] = useState<'conversations' | 'chat'>(
        'conversations'
    )
    const [width, setWidth] = useState<number>(window.innerWidth)
    const dispatch = useAppDispatch()
    const UserId = useAppSelector((state) => state.user.User?._id)
    const {Conversations,isConversationLoad} = useAppSelector((state) => state.user)
    useEffect(() => {
        function SizeListener() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', SizeListener)
        return () => window.removeEventListener('resize', SizeListener)
    }, [])
    useEffect(() => {
        ChangeTitle('Japl | Messages')
        if (UserId) {
            dispatch(GetConversations(UserId))
        }
    }, [UserId])
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 66px)',
            }}
        >
            <SettingsNavbar />
            <Flex style={{ flex: 1 }}>
                {width > 768 ? (
                    <>
                        <ConversationsBox
                         isConversationLoad={isConversationLoad}
                            setCurrentView={setCurrentView}
                            setCurrentChat={setCurrentChat}
                            conversations={Conversations}
                            currentId={UserId!}
                        />
                        <div style={{ width: '100%' }}>
                            {currentChat ? (
                                <Chat
                                    setCurrentView={setCurrentView}
                                    conversation={currentChat}
                                    currentId={UserId!}
                                />
                            ) : (
                                <EmptyChat />
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {currentView === 'chat' ? (
                            <div style={{ width: '100%' }}>
                                {currentChat ? (
                                    <Chat
                                        setCurrentView={setCurrentView}
                                        conversation={currentChat}
                                        currentId={UserId!}
                                    />
                                ) : (
                                    <EmptyChat />
                                )}
                            </div>
                        ) : (
                            <ConversationsBox
                            isConversationLoad={isConversationLoad}
                                setCurrentView={setCurrentView}
                                setCurrentChat={setCurrentChat}
                                conversations={Conversations}
                                currentId={UserId!}
                            />
                        )}
                    </>
                )}
            </Flex>
        </div>
    )
}
