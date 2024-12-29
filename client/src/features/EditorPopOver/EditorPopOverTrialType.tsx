import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {setPopOver} from "../../states/editor/editorSlice.ts";
import back_icon from "../../assets/back_icon.svg";
import getFeatures, {Features} from "../../utils/features.ts";
import ToggleSwitch from "../TogleSwitchEditor/ToggleSwitch.tsx";
import InputEditor from "../Ui/EditorUiComponenets/InputEditor.tsx";

function EditorPopOverTrialType() {
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const popOver = useSelector((state: EditorState) => (state.editor.popOver));
    const [uiData, setUiData] = useState({featureCollapsed: false});
    const [text ,setText] = useState("");
    const dispatch = useDispatch();
    if (!popOver) {
        return null;
    }
    if (!trialType) {
        dispatch(setPopOver())
        return null;
    }

    function onClickFeatures() {
        setUiData(prev => {
            return {...prev, featureCollapsed: !prev.featureCollapsed};
        });
    }

    function onClickToggleSwitch(state: boolean, element: string) {
        console.log(state, element);
    }
    console.log(trialType)
    return (
        <div className={"top-0 left-0 absolute w-dvw h-dvh flex justify-center items-center"}>
            <div
                className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
                <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Trial Type Editor</h1>

                {/*Here is every box*/}
                <InputEditor headline={"Name"} initialValue={trialType.name ? trialType.name:""} setText={setText}/>
                <div
                    className={"w-[90%] min-h-50 flex flex-col justify-center items-center bg-background-grey border p-5 rounded-2xl transition-all duration-500"}>
                    <div className={"w-full flex flex-row"}>
                        <h2 className={"text-left text-clamping-mid font-exo font-extralight w-full"}>Features</h2>
                        <img src={back_icon} onClick={() => (onClickFeatures())}
                             className={`${uiData.featureCollapsed ? "-rotate-90" : "rotate-90"} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 `}
                             alt="image of a arrow"/>
                    </div>
                    <div
                        className={`w-full  flex flex-col gap-3 mt-3 ${uiData.featureCollapsed ? "h-0 " : "h-36 overflow-y-scroll"} overflow-hidden transition-all duration-500`}>
                        {Object.entries(getFeatures(trialType)).map(([key, value]) => (
                            <div className={"w-full flex flex-row justify-between"} key={key}>
                                <h2 className={"font-extralight text-clamping-sm font-exo "}>{key}</h2>
                                <ToggleSwitch key={`${key}!!!`} initialState={value} element={key}
                                              onToggle={onClickToggleSwitch}/>
                            </div>
                        ))}
                    </div>
                </div>


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