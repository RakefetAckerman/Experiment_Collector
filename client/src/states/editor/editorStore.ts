import {configureStore} from "@reduxjs/toolkit";
import editorSlice from "./editorSlice.ts";

const editorStore = configureStore({
        reducer: {
            editor:editorSlice
        },
    }
);

export type EditorState = ReturnType<typeof editorStore.getState>;
export default editorStore;
