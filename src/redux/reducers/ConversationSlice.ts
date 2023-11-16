import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { MessageAPI } from "../../api/services/MessageService";
export const ConversationSliceAsyncActions = {
	
}

type ConversationState = {
   conversationFriends:any
}
const initialState: ConversationState = {
	conversationFriends:null
}
const ConversationSlice = createSlice({
	name: "conversation",
	initialState,
	reducers: {},
});

export const {} = ConversationSlice.actions;

export default ConversationSlice.reducer;
