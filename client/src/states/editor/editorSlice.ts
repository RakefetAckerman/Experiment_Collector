import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExperimentEditor, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import mockup from "../../assets/mockup.json"
import {TrialTypeType} from "../../features/TrialType/types.ts";

interface State {
    editorPreview: ExperimentEditor | undefined;
    currentTrialType: TrialTypeType | undefined;
    currentUiObject: UiObjects | undefined;
    popOverTrialTypeEditor: boolean;
    popOverCreateTrialType: boolean;
    popOverCreateUiObject: boolean;
    popOverUpdateUiObject: boolean;
}

function getExperimentEditor(): ExperimentEditor {
    // @ts-expect-error TODO HERE SHOULD BE EMPTY ARRAY ONLY FOR TESTING PURPOSE
    return mockup;
}

const initialState: State = {
    editorPreview: getExperimentEditor(),
    currentTrialType: undefined,
    currentUiObject:undefined,
    popOverTrialTypeEditor: false,
    popOverCreateTrialType: false,
    popOverCreateUiObject:false,
    popOverUpdateUiObject: false,
};

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        updateEditorExperiment: (state, action: PayloadAction<ExperimentEditor>) => {
            state.editorPreview = action.payload;
        },
        setCurrentTrialType: (state, action: PayloadAction<TrialTypeType>) => {
            state.currentTrialType = action.payload;
        },
        setCurrentUiObject: (state, action: PayloadAction<UiObjects | undefined>) => {
            state.currentUiObject = action.payload;
        },
        setPopOverTrialTypeEditor: (state) => {
            state.popOverTrialTypeEditor = !state.popOverTrialTypeEditor;
        },
        closePopOverTrialTypeEditor: (state) => {
            state.popOverTrialTypeEditor = false;
        },
        openPopOverTrialTypeCreator: (state) => {
            state.popOverCreateTrialType = true;
        },
        closePopOverTrialTypeCreator: (state) => {
            state.popOverCreateTrialType = false;
        },
        openPopOverCreateUiObject: (state) => {
            state.popOverCreateUiObject = true;
        },
        closePopOverCreateUiObject: (state) => {
            state.popOverCreateUiObject = false;
        },
        openPopOverUpdateUiObject: (state) => {
            state.popOverUpdateUiObject = true;
        },
        closePopOverUpdateUiObject: (state) => {
            state.popOverUpdateUiObject = false;
        }
    }
})

export const {
    updateEditorExperiment,
    closePopOverTrialTypeEditor,
    setCurrentTrialType,
    setPopOverTrialTypeEditor,
    openPopOverTrialTypeCreator,
    closePopOverTrialTypeCreator,
    openPopOverCreateUiObject,
    openPopOverUpdateUiObject,
    closePopOverCreateUiObject,
    closePopOverUpdateUiObject,
    setCurrentUiObject
} = editorSlice.actions;

export default editorSlice.reducer