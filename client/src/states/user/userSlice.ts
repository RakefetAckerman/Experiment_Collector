import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TokenType} from "../../utils/tokenType.ts";
import {SerializedUser} from "../../utils/types/userTypes/userTypes.ts";
import {fetchUserUsingToken, getTokenFromBrowser} from "../../utils/helperMethods.ts";


const initialToken = getTokenFromBrowser();
const initialUser = fetchUserUsingToken(initialToken);




interface State {
    user: SerializedUser | undefined;
    token: TokenType | undefined;
}

const initialState: State = {
    user: initialUser,
    token: initialToken,
};



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateToken: (state: State, action: PayloadAction<TokenType>) => {
            state.token = action.payload;
        },
        setUser: (state: State, action: PayloadAction<SerializedUser>) => {
            state.user = action.payload;
        }
    }
})

export const {updateToken, setUser} = userSlice.actions;

export default userSlice.reducer