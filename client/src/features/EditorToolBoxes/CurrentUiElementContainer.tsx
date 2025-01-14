import React from 'react';
import {ExperimentEditor, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import penIcon from "../../assets/pen_icon.svg";
import deleteIcon from "../../assets/trash_bin_icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {TrialTypeType} from "../TrialType/types.ts";
import {EditorState} from "../../states/editor/editorStore.ts";
import {
    openPopOverTrialTypeCreator, openPopOverUpdateUiObject,
    setCurrentTrialType,
    setCurrentUiObject,
    updateEditorExperiment
} from "../../states/editor/editorSlice.ts";
import {removeUiObjectTrialType} from "../../utils/helperMethods.ts";

type Props = {
    uiObject: UiObjects;
}

function CurrentUiElementContainer({uiObject}: Props) {
    const dispatch = useDispatch();
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview));
    const currentUiObject = useSelector((state: EditorState) => (state.editor.currentUiObject));
    let amICurrentUiObject: boolean = false;
    if (currentUiObject && currentUiObject.id === uiObject.id) {
        amICurrentUiObject = true;
    }
    return (
        <div className={`w-full h-full flex flex-row items-center gap-2 `}>
            <img onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick from firing
                const newTrialType = removeUiObjectTrialType(trialType!, uiObject);
                const newExperiment = updateExperimentTrialType(newTrialType, experiment!);
                dispatch(setCurrentTrialType(newTrialType));
                dispatch(updateEditorExperiment(newExperiment));
            }} src={deleteIcon}
                 className={"w-6 h-6 active:scale-125 opacity-50 hover:opacity-100 duration-200 transition-all"}
                 alt={"remove item button"}/>
            <div
                className={`w-full flex justify-between ${amICurrentUiObject ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}   
             transition-all duration-300 items-center overflow-hidden min-h-16 border border-gray-200 drop-shadow-sm rounded-xl p-3  cursor-pointer`}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setCurrentUiObject(uiObject));
                }}
            >
                <h1 className={"font-exo truncate"}>{uiObject.id}</h1>
                <div className={"flex flex-row items-center gap-4"}>
                    <h1 className={"truncate font-exo font-light capitalize"}><span
                        className={"opacity-30 "}>Type: </span>{uiObject.type}</h1>
                    <img src={penIcon} alt="pen/edit icon" onClick={() => {
                        if (!currentUiObject) {
                            dispatch(setCurrentUiObject(uiObject));
                        }
                        dispatch(openPopOverUpdateUiObject());
                    }}
                         className={"w-6 h-6 drop-shadow-md opacity-50 hover:opacity-100 transition-all duration-200 active:scale-125 "}/>
                </div>
            </div>
        </div>
    );
}

function updateExperimentTrialType(updatedTrialType: TrialTypeType, experiment: ExperimentEditor): ExperimentEditor {
    return {
        ...experiment,
        trialTypes: experiment.trialTypes.map(currentType =>
            currentType.id === updatedTrialType.id ? updatedTrialType : currentType
        )
    };
}


export default CurrentUiElementContainer;