import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  // Define your user interface here
}

export interface AuthState {
  mode: "light" | "dark";
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  mode: "light",
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Create the store with your auth slice reducer
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;

