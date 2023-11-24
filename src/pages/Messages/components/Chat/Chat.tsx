import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useAppDispatch } from '../../../../hooks/hook'
import { SocketContext } from '../../../../context/SocketContext'
import { User } from '../../../../types/User/UserTypes'
import { Conversation, Message } from '../../../../types/Chat/ChatTypes'
import {
    GetConversationFriend,
    GetMessages,
} from '../../../../redux/reducers/UserSlice'
import { MessageAPI } from '../../../../api/services/MessageService'
import {
    Avatar,
    AvatarContainer,
    ChatContainer,
    InputContainer,
    MessageInput,
    MessageContainer,
    MessageItem,
    MessageText,
    MessageTime,
    SendButton,
    TopBar,
    MobileTopBar,
} from './style'
import SkeletonMessage from './SkeletonMessage'
import { Flex, Text } from '../../../../components/Common'
import ChatSideBar from './ChatSideBar'
import { IoSendSharp } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'

type Props = {
    conversation: Conversation
    currentId: string
    setCurrentView: Dispatch<SetStateAction<'chat' | 'conversations'>>
}

export const Chat = ({ conversation, currentId, setCurrentView }: Props) => {
    const [messages, setMessages] = useState<Message[] | []>([])
    const [receivedMessage, setReceivedMessage] = useState<Message | null>(null)
    const [isLoad, setLoad] = useState(false)
    const [currentFriend, setCurrentFriend] = useState<User>()
    const [currentMessage, setCurrentMessage] = useState('')
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)
    const [width, setWidth] = useState<number>(window.innerWidth)
    const dispatch = useAppDispatch()

    const socket = useContext(SocketContext)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    console.log(currentFriend)
    useEffect(() => {
        const friendId = conversation.members.find(
            (id: string) => id !== currentId
        )
        dispatch(GetConversationFriend(friendId!)).then((res) =>
            setCurrentFriend(res.payload.friend)
        )
    }, [])
    useEffect(() => {
        function listener(key: KeyboardEvent) {
            {
                if (key.code === 'Enter' || key.code === 'NumpadEnter') {
                    key.preventDefault()

                    SendMessage()
                }
            }
        }
        function SizeListener() {
            {
                setWidth(window.innerWidth)
            }
        }
        window.addEventListener('keypress', listener)
        window.addEventListener('resize', SizeListener)
        return () => {
            window.removeEventListener('keypress', listener)
            window.removeEventListener('resize', SizeListener)
        }
    }, [])
    useEffect(() => {
        socket.emit('add-user', currentId)
        inputRef.current?.focus()
    }, [currentId])

    useEffect(() => {
        setLoad(false)
        dispatch(GetMessages(conversation._id)).then((res) => {
            setMessages(res.payload)
            setTimeout(() => {
                setLoad(true)
            }, 500)
        })
    }, [conversation])

    useEffect(() => {
        socket.on('receive-message', (message) => {
            setReceivedMessage(message)
        })
    }, [])
    useEffect(() => {
        if (receivedMessage !== null) {
            setMessages((prevState) => [...prevState, receivedMessage])
        }
    }, [receivedMessage])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    function SendMessage() {
        if (inputRef.current?.value.length === 0) {
            return
        }
        const friendId = conversation.members.find(
            (el: string) => el !== currentId
        )
        const message: Message = {
            conversationId: conversation._id,
            receiverId: friendId!,
            sender: currentId,
            text: inputRef.current!.value,
            time: new Date(),
        }
        setCurrentMessage('')
        socket.emit('send-message', message)
        MessageAPI.SendMessage(message).then((res) => {
            setMessages((prevState) => [...prevState, res.data])
        })
    }
    console.log(currentFriend)

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Flex style={{ flex: 2 }}>
                {width > 1050 ? (
                    <>
                        <div
                            style={{
                                flex: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <TopBar>
                                <Text fw={'500'} fz={'1.2rem'}>
                                    {currentFriend?.name}
                                    {''}
                                    {currentFriend?.surname}
                                </Text>
                            </TopBar>
                            <ChatContainer>
                                <MessageContainer>
                                    {isLoad ? (
                                        messages.map((message) => (
                                            <MessageItem
                                                ref={scrollRef}
                                                key={message._id}
                                                owner={
                                                    message.sender === currentId
                                                }
                                            >
                                                <AvatarContainer
                                                    onClick={() =>
                                                        setSideBarOpen(true)
                                                    }
                                                    owner={
                                                        message.sender ===
                                                        currentId
                                                    }
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                currentFriend?.photo
                                                            }
                                                        />
                                                    </Avatar>
                                                </AvatarContainer>
                                                <MessageText
                                                    owner={
                                                        message.sender ===
                                                        currentId
                                                    }
                                                >
                                                    {message.text}
                                                    <MessageTime>
                                                        {new Date(
                                                            message.time
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            }
                                                        )}
                                                    </MessageTime>
                                                </MessageText>
                                            </MessageItem>
                                        ))
                                    ) : (
                                        <>
                                            <SkeletonMessage owner />
                                            <SkeletonMessage owner test />
                                            <SkeletonMessage owner={false} />
                                            <SkeletonMessage owner />
                                            <SkeletonMessage
                                                owner={false}
                                                test
                                            />
                                            <SkeletonMessage owner />
                                        </>
                                    )}
                                </MessageContainer>
                            </ChatContainer>
                            <InputContainer>
                                <MessageInput
                                    ref={inputRef}
                                    placeholder="Message..."
                                    value={currentMessage}
                                    onChange={(e) =>
                                        setCurrentMessage(e.target.value)
                                    }
                                />
                                <SendButton
                                    isEmpty={currentMessage.length === 0}
                                    onClick={SendMessage}
                                >
                                    <IoSendSharp />
                                </SendButton>
                            </InputContainer>
                        </div>

                        <ChatSideBar
                            setSideBarOpen={setSideBarOpen}
                            currentFriend={currentFriend!}
                        />
                    </>
                ) : !sideBarOpen ? (
                    <div
                        style={{
                            flex: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {width > 768 ? (
                            <TopBar>
                                <Text
                                    onClick={() => setSideBarOpen(true)}
                                    fw={'500'}
                                    fz={'1.2rem'}
                                >
                                    {currentFriend?.name}{' '}
                                    {currentFriend?.surname[0]}.
                                </Text>
                            </TopBar>
                        ) : (
                            <MobileTopBar
                                onClick={() => setCurrentView('conversations')}
                            >
                                <Flex align="center" gap="10px">
                                    <IoIosArrowBack fontSize={'1.4rem'} />
                                    <Avatar>
                                        <img src={currentFriend?.photo} />
                                    </Avatar>
                                    <Text color="#3C4447" fz="14px" fw="500">
                                        {currentFriend?.name}{' '}
                                        {currentFriend?.surname[0]}.
                                    </Text>
                                </Flex>
                            </MobileTopBar>
                        )}
                        <ChatContainer>
                            <MessageContainer>
                                {messages.map((message) => (
                                    <MessageItem
                                        ref={scrollRef}
                                        key={message._id}
                                        owner={message.sender === currentId}
                                    >
                                        <AvatarContainer
                                            onClick={() => setSideBarOpen(true)}
                                            owner={message.sender === currentId}
                                        >
                                            <Avatar>
                                                <img
                                                    src={currentFriend?.photo}
                                                />
                                            </Avatar>
                                        </AvatarContainer>
                                        <MessageText
                                            owner={message.sender === currentId}
                                        >
                                            {message.text}
                                            <MessageTime>
                                                {new Date(
                                                    message.time
                                                ).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </MessageTime>
                                        </MessageText>
                                    </MessageItem>
                                ))}
                            </MessageContainer>
                        </ChatContainer>
                        <InputContainer>
                            <MessageInput
                                ref={inputRef}
                                placeholder="Message..."
                                value={currentMessage}
                                onChange={(e) =>
                                    setCurrentMessage(e.target.value)
                                }
                            />
                            <SendButton
                                isEmpty={currentMessage.length === 0}
                                onClick={SendMessage}
                            >
                                <IoSendSharp />
                            </SendButton>
                        </InputContainer>
                    </div>
                ) : (
                    <ChatSideBar
                        setSideBarOpen={setSideBarOpen}
                        currentFriend={currentFriend!}
                    />
                )}
            </Flex>
        </div>
    )
}
