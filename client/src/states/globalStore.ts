import userReducer from "./user/userSlice.ts"
import {configureStore} from "@reduxjs/toolkit";

const globalStore = configureStore({
        reducer: {
            user: userReducer,
        },
    }
);

export type RootState = ReturnType<typeof globalStore.getState>;
export default globalStore;
