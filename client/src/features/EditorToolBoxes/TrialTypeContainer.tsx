import React from 'react';
import {TrialTypeType} from "../TrialType/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import {setCurrentTrialType} from "../../states/editor/editorSlice.ts";
type Props = {
    trialType: TrialTypeType;
}

function TrialTypeContainer({trialType}: Props) {
    const name = trialType.name ? `${trialType.name}` : `ID: ${trialType.id}`;
    const currentTrialType = useSelector((state: EditorState) => (state.editor.currentTrialType))
    const trialTypeId = currentTrialType ? currentTrialType.id : null;
    const dispatch = useDispatch();
    return (
        <div
            className={`w-full cursor-pointer flex justify-between ${trialTypeId === trialType.id ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}
             transition-all duration-300 items-center overflow-y-scroll overflow-x-hidden h-20 border border-gray-200 drop-shadow-sm rounded-xl p-3 `}
            onClick={() => dispatch(setCurrentTrialType(trialType))}>
            <h1 className={"font-exo truncate"}>{name}</h1>
            <h1 className={"truncate font-exo font-light"}><span
                className={"opacity-30"}>Elements: </span>{trialType.children.length}</h1>
        </div>
    );
}

export default TrialTypeContainer;