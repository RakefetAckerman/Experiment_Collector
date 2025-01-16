import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import CurrentUiElementContainer from "./CurrentUiElementContainer.tsx";
import plusIcon from "../../assets/plus_icon_solar_bold.svg";
import {openPopOverCreateUiObject, openPopOverEditUiObject} from "../../states/editor/editorSlice.ts";

type Props = {
    isCollapsed: boolean,
}

function BoxCurrentUiElements({isCollapsed}: Props) {
    const item = useSelector((state: EditorState) => (state.editor.currentItem));
    const dispatch = useDispatch();
    return (
        <div
            className={` ${isCollapsed ? "h-40" : "min-h-96 "} w-full flex flex-col items-center bg-background-grey border border-gray-100 shadow-md rounded-xl p-3 gap-2`}>
            <h1 className={`font-exo truncate font-extralight text-clamping-sm transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>Ui
                Elements</h1>
            <h2 className={`font-exo truncate font-bold text-clamping-sm transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 -mb-10"}`}>{item?.children.length}</h2>
            <div
                className={`${isCollapsed ? "opacity-0 h-0" : "opacity-100 "} w-full relative flex flex-row justify-between items-center`}>
                <h3 className={"text-clamping-sm text-center w-full font-exo font-light opacity-55 truncate"}>Current Item
                    Ui Elements</h3>
            </div>
            <div
                className={`w-[90%] flex flex-col overflow-y-scroll mb-5 justify-start items-center gap-3 ${isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>
                {item && item.children.map((uiObject) =>
                    <CurrentUiElementContainer key={`UiObject-${uiObject.id}-${uiObject.type}`} uiObject={uiObject}/>
                )}
                {item && <img src={plusIcon} onClick={() => dispatch(openPopOverCreateUiObject())}
                     className={`${isCollapsed ? "opacity-0" : "opacity-55 hover:opacity-100 active:scale-125"} w-12 aspect-square duration-200 transition-all`}/>}
            </div>
        </div>
    );
}

export default BoxCurrentUiElements;