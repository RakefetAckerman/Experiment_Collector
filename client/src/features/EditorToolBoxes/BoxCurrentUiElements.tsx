import React from 'react';
import {useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import CurrentUiElementContainer from "./CurrentUiElementContainer.tsx";

type Props = {
    isCollapsed: boolean,
}

function BoxCurrentUiElements({isCollapsed}: Props) {
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    return (
        <div
            className={`w-full flex flex-col items-center bg-background-grey border border-gray-100 shadow-md rounded-xl p-3 gap-2`}>
            <h1 className={`font-exo truncate font-extralight text-clamping-sm transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>Ui
                Elements</h1>
            <h2 className={`font-exo truncate font-bold text-clamping-sm transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 -mb-10"}`}>{trialType?.children.length}</h2>
            <div
                className={`${isCollapsed ? "opacity-0 h-0" : "opacity-100 "} w-full relative flex flex-row justify-between items-center`}>
                <h3 className={"text-clamping-sm text-center w-full font-exo font-light opacity-55 truncate"}>Trial Type
                    Ui Elements</h3>
            </div>
            <div
                className={`w-[90%] flex flex-col overflow-y-scroll max-h-[20dvh] mb-5 justify-start items-center gap-3 ${isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>
                {trialType && trialType.children.map((uiObject) =>
                    <CurrentUiElementContainer key={`UiObject-${uiObject.id}-${uiObject.type}`} uiObject={uiObject}/>
                )}
            </div>
        </div>
    );
}

export default BoxCurrentUiElements;