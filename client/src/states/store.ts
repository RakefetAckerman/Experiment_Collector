import userReducer from "./user/userSlice.ts"
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
        reducer: {
            user: userReducer,
        },
    }
);

export type RootState = ReturnType<typeof store.getState>;
export default store;
