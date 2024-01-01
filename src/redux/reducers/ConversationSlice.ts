import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { MessageAPI } from '../../api/services/MessageService'
export const ConversationSliceAsyncActions = {}

type ConversationState = {
    conversationFriends: []
}
const initialState: ConversationState = {
    conversationFriends: [],
}
const ConversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {},
})

export const {} = ConversationSlice.actions

export default ConversationSlice.reducer
