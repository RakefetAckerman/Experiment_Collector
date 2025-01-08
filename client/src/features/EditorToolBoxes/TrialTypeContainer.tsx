import React from 'react';
import {TrialTypeType} from "../TrialType/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import {setCurrentTrialType, setCurrentUiObject, updateEditorExperiment} from "../../states/editor/editorSlice.ts";
import deleteIcon from "../../assets/trash_bin_icon.svg"
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";

type Props = {
    trialType: TrialTypeType;
}

function TrialTypeContainer({trialType}: Props) {
    const name = trialType.name ? `${trialType.name}` : `ID: ${trialType.id}`;
    const currentTrialType = useSelector((state: EditorState) => (state.editor.currentTrialType))
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview))
    const trialTypeId = currentTrialType ? currentTrialType.id : null;
    const dispatch = useDispatch();
    return (
        <div className={"w-full h-full flex flex-row items-center gap-2 "}>
            <img onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick from firing
                if (confirm("Delete is Permanent")) {
                    dispatch(updateEditorExperiment(removeTrialType(trialType, experiment!)));
                }
            }} src={deleteIcon}
                 className={"w-6 h-6 active:scale-125 opacity-50 hover:opacity-100 duration-200 transition-all"}
                 alt={"remove item button"}/>
            <div
                className={`w-full h-16 cursor-pointer flex justify-between ${trialTypeId === trialType.id ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}
             transition-all duration-300 items-center relative h-20 border-gray-200 drop-shadow-sm p-4 rounded-xl`}
                onClick={() => {
                    dispatch(setCurrentTrialType(trialType));
                    dispatch(setCurrentUiObject(undefined));
                }}>
                <h1 className={"font-exo truncate max-w-32"}>{name}</h1>
                <h1 className={"truncate font-exo font-light"}><span
                    className={"opacity-30"}>Elements: </span>{trialType.children.length}</h1>
            </div>
        </div>
    );
}

function removeTrialType(trialType: TrialTypeType, experiment: ExperimentEditor): ExperimentEditor {
    return {
        ...experiment,
        trialTypes: experiment.trialTypes.filter(currentType =>
            currentType.id !== trialType.id
        )
    };
}

export default TrialTypeContainer;