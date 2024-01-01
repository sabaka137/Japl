import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Conversation } from '../../../../types/Chat/ChatTypes'
import {
    ConversationInput,
    ConversationsContent,
    ConversationsWrapper,
} from '../../style'
import { TopBar } from '../Chat/style'
import ConversationItem from './ConversationItem'
import EmptyFriend from './EmptyFriend'
import { useAppDispatch } from '../../../../hooks/hook'
import { ConversationSliceAsyncActions } from '../../../../redux/reducers/ConversationSlice'
import PageLoader from '../../../../components/Loader/PageLoader'

type Props = {
    setCurrentChat: Dispatch<SetStateAction<Conversation | null>>
    conversations: Conversation[]
    currentId: string
    setCurrentView: Dispatch<SetStateAction<'chat' | 'conversations'>>
    isConversationLoad: boolean
}

export const ConversationsBox = ({
    setCurrentChat,
    conversations,
    currentId,
    setCurrentView,
    isConversationLoad,
}: Props) => {
    return (
        <ConversationsWrapper>
            {isConversationLoad ? (
                <>
                    <TopBar>
                        <ConversationInput placeholder="Search" />
                    </TopBar>
                    <ConversationsContent empty={conversations?.length === 0}>
                        {conversations?.length !== 0 ? (
                            conversations?.map((c: Conversation) => (
                                <div key={c._id}>
                                    <ConversationItem
                                        setCurrentView={setCurrentView}
                                        setCurrentChat={setCurrentChat}
                                        conversations={c}
                                        currentId={currentId}
                                    />
                                </div>
                            ))
                        ) : (
                            <EmptyFriend />
                        )}
                    </ConversationsContent>
                </>
            ) : (
                <PageLoader />
            )}
        </ConversationsWrapper>
    )
}
