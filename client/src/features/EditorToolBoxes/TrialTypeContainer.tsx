import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import {ItemTypeEditor} from "../TrialType/types.ts";
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {setCurrentItem, setCurrentUiObject} from "../../states/editor/editorSlice.ts";
import back_icon from "../../assets/back_icon.svg";

type Props = {
    trialType: string | undefined,
}

function TrialTypeContainer({trialType}: Props) {
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview))
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);
    if (!trialType || !experiment) {
        return null;
    }
    const trialTypeItems: ItemTypeEditor[] = getItemsByTrialType(trialType, experiment);
    console.log(trialTypeItems);
    return (
        <div
            className={"w-full h-full flex flex-col items-center gap-2 opacity-30 hover:opacity-100 duration-200 transition-all"}>
            <div
                className={`w-full flex justify-between bg-gray-200 
             transition-all duration-300 items-center relative h-14 border-gray-200 drop-shadow-sm p-4 rounded-xl`}
            >
                <h1 className={"font-exo truncate max-w-32"}>{trialType}</h1>
                <h1 className={"truncate font-exo font-light"}><span
                    className={"opacity-30"}>Elements: </span>{trialTypeItems.length}</h1>
                <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                     className={`${isCollapsed ? "-rotate-90" : "rotate-90"} p-2 w-7 border-gray-300 border-solid border rounded-full transition-all duration-200
                      hover:bg-gray-500 active:scale-110 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-0`}
                     alt="image of a arrow"/>
            </div>
            {!isCollapsed && trialTypeItems && trialTypeItems.map((item: ItemTypeEditor, index: number) => {
                return<div className={"ml-[5%] gap-3 w-full flex justify-between items-center"}>
                    <div className={"w-2 h-2 bg-gray-500 rounded-full"}></div>
                    <div key={`item_${index}_${index}`}
                         className={`w-full h-14 cursor-pointer flex justify-between bg-gray-200 hover:bg-gray-300
             transition-all duration-300 items-center relative border-gray-200 drop-shadow-sm p-4 rounded-xl`}
                         onClick={() => {
                             dispatch(setCurrentUiObject(undefined));
                             dispatch(setCurrentItem(item));
                         }}>
                        <h1 className={"font-exo truncate max-w-32"}>{item.name}</h1>
                        <h1 className={"truncate font-exo font-light"}><span
                            className={"opacity-30"}>Elements: </span>{item.children.length}</h1>
                    </div>
                </div>

            })}

        </div>
    );
}

function getItemsByTrialType(trialType: string, experiment: ExperimentEditor): ItemTypeEditor[] {
    return experiment.items.filter(item => item.trialType === trialType);
}

export default TrialTypeContainer;