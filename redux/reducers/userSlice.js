import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    isLoggedIn: false
  }
  
  export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
      setIsLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
      },
      setUserInfo: (state, action) => {
        state.userInfo = action.payload;
      },
      logout: (state) => {
        state.userInfo = null;
        state.isLoggedIn = false;
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userId');
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setIsLoggedIn, setUserInfo, logout } = userSlice.actions
  
  export default userSlice.reducer