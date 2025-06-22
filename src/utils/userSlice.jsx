import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // set user state to payload (e.g. user object)
    },
    removeUser: (state, action) => {
      return null; // resets the user on logout
    }
  }
});

// Export actions
export const { addUser, removeUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;

