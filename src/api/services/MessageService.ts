import API from '..'
import { Message, newMessage } from '../../types/Chat/ChatTypes'

export const MessageAPI = {
    CheckConversationAndSendMessage(data: newMessage) {
        return API.post(`conversation/newConversation`, data)
    },
    SendMessage(data: Message) {
        return API.post(`message/newMessage`, data)
    },
    getConversations(id: string) {
        return API.get(`conversation/getConversations?userId=${id}`)
    },
    getConversationFriend(id: string) {
        return API.get(`conversation/getFriend?friendId=${id}`)
    },
    getMessages(id: string) {
        return API.get(`conversation/getMessages?conversationId=${id}`)
    },
}
