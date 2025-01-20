import React, {SetStateAction, useState} from 'react';
import back_icon from "../../../assets/back_icon.svg";

interface ChooseTrialTypeProps {
    trialType: { trialTypes: (string | undefined)[]; current: string | undefined },
    setTrialType: React.Dispatch<SetStateAction<{
        trialTypes: (string | undefined)[];
        current: string | undefined
    }>>
}

function ChooseTrialType({trialType, setTrialType}: ChooseTrialTypeProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    function onClickTrialTypeName(trialTypeName: string) {
        setTrialType(prev => ({...prev, current:trialTypeName}));
    }
    return (
        <div
            className={"w-[90%] min-h-50 flex flex-col justify-center items-center bg-background-grey border p-5 rounded-2xl transition-all duration-500"}>
            <div className={"w-full flex flex-row"}>
                <h2 className={"text-left text-clamping-mid font-exo font-extralight w-full"}>Available Trial Types</h2>
                <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                     className={`${isCollapsed ? "-rotate-90" : "rotate-90"} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 `}
                     alt="image of a arrow"/>
            </div>
            {trialType?.trialTypes &&  <div
                className={`w-full  flex flex-col gap-2 mt-3 ${isCollapsed ? "h-0 " : "h-36 overflow-y-scroll"} overflow-hidden transition-all duration-500`}>
                {Object.entries(trialType!.trialTypes).map(([key, value]) => (
                    <h2 onClick={()=>onClickTrialTypeName(value!)}
                        key={`${key}-${value!}`}
                        className={`${value === trialType?.current ? "bg-gray-300" : "hover:bg-gray-200 bg-white"} font-extralight text-clamping-sm font-exo w-full  p-3 rounded-xl
                     drop-shadow transition-all duration-200`}>{`${value}`}</h2>
                ))}
            </div>}
        </div>

    );
}

export default ChooseTrialType;