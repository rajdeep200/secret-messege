import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageList: []
  }
  
  export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
      setMessages: (state, action) => {
        state.messageList = action.payload;
      },
      deleteMessage: (state, action) => {
        const id = action.payload;
        const tempArray = state.messageList;
        const slicedArray = tempArray.splice(id, 1);
        state.messageList = slicedArray;
      },
      deleteAllMessages: (state) => {
        state.messageList = [];
      }
    },
  });
  
  export const { setMessages, deleteMessage, deleteAllMessages } = messageSlice.actions
  
  export default messageSlice.reducer