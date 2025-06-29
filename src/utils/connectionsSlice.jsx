import { createSlice } from "@reduxjs/toolkit";


const connectionsSlice = createSlice({
    name : "connection",
    initialState : null,
    reducers : {
        addConnections : (state, action) => {
            return action.payload;
        },
        removeConnection : () => {
            return null;
        }
    }
})

export const {addConnections , removeConnection} = connectionsSlice.actions;

export default connectionsSlice.reducer;

