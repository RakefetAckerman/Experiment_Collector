import React, {useState} from 'react';
import back_icon from "../../assets/back_icon.svg";
import BoxExperimentName from "../EditorToolBoxes/BoxExperimentName.tsx";
import {useSelector} from "react-redux";
import BoxItems from "../EditorToolBoxes/BoxItems.tsx";
import BoxCurrentUiElements from "../EditorToolBoxes/BoxCurrentUiElements.tsx";
import {EditorState} from "../../states/editor/editorStore.ts";
import BoxTrialTypes from "../EditorToolBoxes/BoxTrialTypes.tsx";

function EditorToolSideBar() {
    const experiment = useSelector((state:EditorState ) => (state.editor.editorPreview))
    const [isCollapsed, setIsCollapsed] = useState(true);
     if (!experiment) {
         return <aside
             className={`border-gray-300 gap-4 border-solid border transition-all duration-500 flex justify-between items-center flex-col pt-4 bg-white h-dvh ${isCollapsed ? "w-32" : "w-[30rem]"} relative`}>
             <div
                 className={`flex justify-center items-center flex-col w-full gap-4 overflow-x-hidden h-full`}>
                 <h2 className={"font-exo font-extralight text-3xl underline underline-offset-8 decoration-1 mb-3"}>Editor</h2>
             </div>
             <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                  className={`${isCollapsed ? "rotate-180" : ""} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 absolute top-1/2 right-3`}
                  alt="image of a arrow"/>
         </aside>
     }
    return (
        <aside
            className={`border-gray-300 gap-4 border-solid border transition-all duration-700 flex justify-between items-center flex-col pt-4 bg-white h-dvh ${isCollapsed ? "min-w-[15rem]" : "min-w-[35rem]"} relative`}>
            <div
                className={`flex justify-center items-center flex-col w-full gap-4 overflow-x-hidden h-full`}>
                <h2 className={"font-exo font-light text-3xl underline underline-offset-8 decoration-1 mb-3"}>Editor</h2>
                <div
                    className={`${isCollapsed ? "opacity-50" : "opacity-100"} h-full w-4/5 duration-500 transition-all flex justify-start items-start flex-col gap-8 p-3 overflow-y-auto`}>
                    <BoxExperimentName experimentName={experiment!.name} isCollapsed={isCollapsed}/>
                    <BoxTrialTypes experimentData={experiment!} isCollapsed={isCollapsed}/>
                    <BoxItems experimentData={experiment!} isCollapsed={isCollapsed}/>
                    <BoxCurrentUiElements isCollapsed={isCollapsed}/>
                </div>
            </div>
            <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                 className={`${isCollapsed ? "rotate-180" : ""} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 absolute top-1/2 right-3`}
                 alt="image of a arrow"/>
        </aside>
    );
}

export default EditorToolSideBar;