import React from 'react';
import penIcon from "../../assets/pen_icon.svg"
import testIcon from "../../assets/test_icon.svg"

type Props = {
    experimentName: string,
    isCollapsed: boolean,
}

function BoxExperimentName({experimentName , isCollapsed}: Props) {
    return (
        <div className={"w-full bg-background-grey border border-gray-100 shadow-md rounded-xl p-3"}>
            <div
                className={`${isCollapsed ? "opacity-0 h-0" : "opacity-100 "} w-full relative flex flex-row justify-between items-center`}>
                <img src={testIcon} alt="editor icon" className={"w-6 h-6 opacity-55"}/>
                <h3 className={"text-clamping-sm text-center w-full font-exo font-light opacity-55"}>experimentName</h3>
                <img src={penIcon} alt="pen/edit icon"
                     className={"w-6 h-6 drop-shadow-md opacity-50 hover:opacity-100 transition-all duration-200 active:scale-125 "}/>
            </div>
            <div className={"flex flex-col justify-start w-full items-center gap-3"}>
                <h2 className={`${isCollapsed ? "text-clamping-sm font-bold" : "text-clamping-mid font-light"} duration-500 transition-all text-center w-full font-exo  opacity-100 uppercase`}>{experimentName}</h2>
            </div>
        </div>

    );
}

export default BoxExperimentName;