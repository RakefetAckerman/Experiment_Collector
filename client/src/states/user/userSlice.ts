import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TokenType} from "../../utils/tokenType.ts";
import {SerializedUser} from "../../utils/types/userTypes/userTypes.ts";
import {fetchUserFromSessionStorage, fetchUserUsingToken, getTokenFromBrowser} from "../../utils/helperMethods.ts";
import {USER_KEY} from "../../utils/constants.ts";


const initialToken = getTokenFromBrowser();
const initialUser = fetchUserFromSessionStorage();

interface State {
    user: SerializedUser | undefined;
    token: TokenType | undefined;
}

const initialState: State = {
    user: initialUser,
    token: initialToken,
};

function setToSessionStorage(key: string, value: object) {
    const objToString = JSON.stringify(value);
    sessionStorage.setItem(key,objToString);
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateToken: (state: State, action: PayloadAction<TokenType>) => {
            state.token = action.payload;
        },
        setUser: (state: State, action: PayloadAction<SerializedUser>) => {
            state.user = action.payload;
            setToSessionStorage(USER_KEY , action.payload);
        }
    }
})

export const {updateToken, setUser} = userSlice.actions;

export default userSlice.reducer