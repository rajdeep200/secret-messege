import { configureStore } from '@reduxjs/toolkit';
import useReducer from './reducers/userSlice';
import messageReducer from './reducers/messageSlice'

export const store = configureStore({
  reducer: {
    user: useReducer,
    message: messageReducer
  },
})