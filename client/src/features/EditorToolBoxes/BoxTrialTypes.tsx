import React from 'react';
import penIcon from "../../assets/pen_icon.svg"
import testIcon from "../../assets/test_icon.svg"
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import TrialTypeContainer from "./TrialTypeContainer.tsx";
import {useDispatch} from "react-redux";
import {openPopOverTrialTypeCreator, setPopOverTrialTypeEditor} from "../../states/editor/editorSlice.ts";
import plusIcon from "../../assets/plus_icon_solar_bold.svg"

type Props = {
    experimentData: ExperimentEditor,
    isCollapsed: boolean,
}

function BoxTrialType({experimentData, isCollapsed}: Props) {
    const dispatch = useDispatch();

    return (
        <div
            className={`${isCollapsed ? "h-40" : "min-h-96 "} transition-all duration-1000 relative w-full flex flex-col items-center bg-background-grey border border-gray-100 shadow-md rounded-xl p-3 gap-2`}>
            <h1 className={`font-exo font-extralight text-clamping-sm truncate transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>TrialTypes</h1>
            <h2 className={`font-exo font-bold text-clamping-sm truncate transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 -mb-10 "}`}>{experimentData.trialTypes.length}</h2>
            <div
                className={`${isCollapsed ? "opacity-0 h-0" : "opacity-100 "} w-full relative flex flex-row justify-between items-center`}>
                <img src={testIcon} alt="editor icon" className={"w-6 h-6 opacity-55"}/>
                <h3 className={"text-clamping-sm text-center w-full font-exo font-light opacity-55 truncate"}>Experiment
                    Trial Types</h3>
                <img src={penIcon} alt="pen/edit icon" onClick={() => dispatch(setPopOverTrialTypeEditor())}
                     className={"w-6 h-6 drop-shadow-md opacity-50 hover:opacity-100 transition-all duration-200 active:scale-125 "}/>
            </div>
            <div
                className={`p-5 w-[95%] flex flex-col overflow-y-scroll mb-5 justify-start items-center gap-3 ${isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>
                {experimentData.trialTypes.map((trialType) =>
                    <TrialTypeContainer key={`${trialType.id}$trialType`} trialType={trialType}/>
                )}
                <img src={plusIcon} onClick={() => dispatch(openPopOverTrialTypeCreator())}
                     className={`${isCollapsed ? "opacity-0" : "opacity-55 hover:opacity-100 active:scale-125"} w-12 aspect-square duration-200 transition-all`}/>
            </div>
        </div>

    );
}


export default BoxTrialType;