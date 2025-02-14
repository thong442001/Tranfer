import { createSlice } from "@reduxjs/toolkit";
//import { PostInforUser } from "./API";

interface AppState {
    user: string;
}

const initialState: AppState = {
    user: '',
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: { // chạy trong app
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = '';
        },
    },
    extraReducers: (builder) => {
        //send infor user
        // builder.addCase(PostInforUser.pending, (state, action) => {
        //     console.log("...Pending");
        // });
        // builder.addCase(PostInforUser.fulfilled, (state, action) => {
        //     console.log("...fulfilled");
        //     //console.log(action.payload);
        // });
        // builder.addCase(PostInforUser.rejected, (state, action) => {
        //     console.log("...Rejected");
        // });
    }
});

export const {
    login,
    logout,
} = appSlice.actions;
export default appSlice.reducer;




