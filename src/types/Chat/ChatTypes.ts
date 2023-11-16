export interface Message {
    conversationId: string
    receiverId: string
    sender: string
    text: string
    time: Date
    _id?: string
}

export interface newMessage {
    receiverId: string
    senderId: string
    text: string
    time: Date
    _id?: string
}
export interface Conversation {
    _id: string
    members:string[]
}