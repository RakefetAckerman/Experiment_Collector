import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExperimentEditor, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import mockup from "../../assets/mockup.json"
import {ItemTypeEditor} from "../../features/TrialType/types.ts";

interface State {
    editorPreview: ExperimentEditor | undefined;
    currentItem: ItemTypeEditor | undefined;
    currentUiObject: UiObjects | undefined;
    popOverEditItem: boolean;
    popOverCreateItem: boolean;
    popOverCreateUiObject: boolean;
    popOverEditUiObject: boolean;
    popOverCreateTrialType: boolean;

}

function getExperimentEditor(): ExperimentEditor {
    // @ts-expect-error TODO HERE SHOULD BE EMPTY ARRAY ONLY FOR TESTING PURPOSE
    return mockup;
}

const initialState: State = {
    editorPreview: getExperimentEditor(),
    currentItem: undefined,
    currentUiObject: undefined,
    popOverEditItem: false,
    popOverCreateItem: false,
    popOverCreateUiObject: false,
    popOverEditUiObject: false,
    popOverCreateTrialType: false,
};

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        updateEditorExperiment: (state, action: PayloadAction<ExperimentEditor>) => {
            state.editorPreview = action.payload;
        },
        setCurrentItem: (state, action: PayloadAction<ItemTypeEditor>) => {
            state.currentItem = action.payload;
        },
        setCurrentUiObject: (state, action: PayloadAction<UiObjects | undefined>) => {
            state.currentUiObject = action.payload;
        },
        openPopOverEditItem: (state) => {
            state.popOverEditItem = true;
        },
        closePopOverEditItem: (state) => {
            state.popOverEditItem = false;
        },
        openPopOverCreateItem: (state) => {
            state.popOverCreateItem = true;
        },
        closePopOverCreateItem: (state) => {
            state.popOverCreateItem = false;
        },
        openPopOverCreateUiObject: (state) => {
            state.popOverCreateUiObject = true;
        },
        closePopOverCreateUiObject: (state) => {
            state.popOverCreateUiObject = false;
        },
        openPopOverEditUiObject: (state) => {
            state.popOverEditUiObject = true;
        },
        closePopOverEditUiObject: (state) => {
            state.popOverEditUiObject = false;
        },
        closePopOverCreateTrialType: (state) => {
            state.popOverCreateTrialType = false;
        },
        openPopOverCreateTrialType: (state) => {
            state.popOverCreateTrialType = true;
        }
    }
})

export const {
    updateEditorExperiment,
    closePopOverEditItem,
    setCurrentItem,
    openPopOverEditItem,
    openPopOverCreateItem,
    closePopOverCreateItem,
    openPopOverCreateUiObject,
    openPopOverEditUiObject,
    openPopOverCreateTrialType,
    closePopOverCreateUiObject,
    closePopOverCreateTrialType,
    closePopOverEditUiObject,
    setCurrentUiObject
} = editorSlice.actions;

export default editorSlice.reducer