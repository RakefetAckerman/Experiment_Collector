import React, {Dispatch, SetStateAction, useState} from 'react';
import back_icon from "../../../assets/back_icon.svg";
import getFeatures from "../../../utils/features.ts";
import ToggleSwitch from "../../TogleSwitchEditor/ToggleSwitch.tsx";
import {TrialTypeType} from "../../TrialType/types.ts";
type Props = {
    trialType: TrialTypeType;
}


function FeaturesEditor({trialType }:Props) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    function onClickToggleSwitch(state:boolean , element:string) {
        console.log({state , element});
    }

    return (
        <div
            className={"w-[90%] min-h-50 flex flex-col justify-center items-center bg-background-grey border p-5 rounded-2xl transition-all duration-500"}>
            <div className={"w-full flex flex-row"}>
                <h2 className={"text-left text-clamping-mid font-exo font-extralight w-full"}>Features</h2>
                <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                     className={`${isCollapsed ? "-rotate-90" : "rotate-90"} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 `}
                     alt="image of a arrow"/>
            </div>
            <div
                className={`w-full  flex flex-col gap-3 mt-3 ${isCollapsed ? "h-0 " : "h-36 overflow-y-scroll"} overflow-hidden transition-all duration-500`}>
                {Object.entries(getFeatures(trialType)).map(([key, value]) => (
                    <div className={"w-full flex flex-row justify-between"} key={key}>
                        <h2 className={"font-extralight text-clamping-sm font-exo "}>{key}</h2>
                        <ToggleSwitch key={`${key}!!!`} initialState={value} element={key}
                                      onToggle={onClickToggleSwitch}/>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default FeaturesEditor;