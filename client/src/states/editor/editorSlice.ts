import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import mockup from "../../assets/mockup.json"
import {TrialTypeType} from "../../features/TrialType/types.ts";

interface State {
    editorPreview: ExperimentEditor | undefined;
    currentTrialType: TrialTypeType | undefined;
    popOver: boolean;
}

function getExperimentEditor() : ExperimentEditor {
    // @ts-expect-error TODO HERE SHOULD BE EMPTY ARRAY ONLY FOR TESTING PURPOSE
    return mockup;
}
const initialState: State = {
    editorPreview: getExperimentEditor(),
    currentTrialType: undefined,
    popOver:false
};

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        updateEditorPreview: (state, action: PayloadAction<ExperimentEditor>) => {
            state.editorPreview = action.payload;
        },
        setCurrentTrialType: (state, action: PayloadAction<TrialTypeType>) => {
            state.currentTrialType = action.payload;
        },
        setPopOver: (state) => {
          state.popOver = !state.popOver;
        }
    }
})

export const {updateEditorPreview , setCurrentTrialType , setPopOver} = editorSlice.actions;

export default editorSlice.reducer