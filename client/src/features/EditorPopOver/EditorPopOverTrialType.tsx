import React, { useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {setPopOver} from "../../states/editor/editorSlice.ts";
import InputEditor from "../Ui/EditorUiComponenets/InputEditor.tsx";
import FeaturesEditor from "../Ui/EditorUiComponenets/FeaturesEditor.tsx";

function EditorPopOverTrialType() {
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const popOver = useSelector((state: EditorState) => (state.editor.popOver));
    const [text ,setText] = useState("");
    const dispatch = useDispatch();
    if (!popOver) {
        return null;
    }
    if (!trialType) {
        dispatch(setPopOver())
        return null;
    }

    console.log(trialType)
    return (
        <div className={"top-0 left-0 absolute w-dvw h-dvh flex justify-center items-center"}>
            <div
                className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
                <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Trial Type Editor</h1>
                <h2 className={"opacity-55 max-w-full min-h-[2rem] truncate font-exo text-clamping-sm"}>Trial Type ID:{trialType.id}</h2>

                {/*Ui Containers*/}
                <InputEditor headline={"Name"} initialValue={trialType.name ? trialType.name:""} setText={setText}/>
                <FeaturesEditor trialType={trialType}/>
                <button className={"w-44 text-clamping-sm hover:font-medium hover:bg-gray-300 active:scale-110 font-extralight font-exo bg-background-grey rounded-2xl transition-all duration-200 min-h-16"}>Save changes</button>
                <img alt={"Close"}
                     id={"close_button"}
                     src={closeIcon}
                     className={"transition-all duration-300 absolute w-8 aspect-square top-4 right-4 opacity-50 hover:opacity-100 active:scale-110 z-10"}
                     onClick={() => (dispatch(setPopOver()))}/>
            </div>
        </div>
    );
}

export default EditorPopOverTrialType;