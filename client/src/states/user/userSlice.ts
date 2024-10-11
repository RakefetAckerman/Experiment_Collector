import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SerializedUser {
    userId: { platform: string, email: string };
    role: string;
    username?: string;
}

interface State {
    user: SerializedUser | undefined;
    token: string | undefined;
}

const initialState: State = {
    user: undefined,
    token: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateToken: (state: State, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state: State, action: PayloadAction<SerializedUser>) => {
            state.user = action.payload;
        }
    }
})

export const {updateToken, setUser} = userSlice.actions;

export default userSlice.reducer