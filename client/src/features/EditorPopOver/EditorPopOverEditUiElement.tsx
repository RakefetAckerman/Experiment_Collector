import React from 'react';
import closeIcon from "../../assets/close.svg";
import {
     closePopOverUpdateUiObject,
} from "../../states/editor/editorSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";

function EditorPopOverEditUiElement() {
    const dispatch = useDispatch();
    const popOver = useSelector((state: EditorState) => (state.editor.popOverUpdateUiObject));
    const currentUiObject = useSelector((state: EditorState) => (state.editor.currentUiObject));
    if (!popOver || !currentUiObject) {
        return null;
    }
    function saveUiObject() {
        console.log("saveElement");

    }
    // function renderUiElementUpdater(uiObject: UiObjects) {
    //
    // }
    return (
        <div
            className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Update Ui Element</h1>

            {/*Ui renderer*/}
            <h2 className={"text-center font-exo  text-clamping-sm mt-3"}>type:{currentUiObject.type}</h2>
            <button
                onClick={() => saveUiObject()}
                className={"w-44 text-clamping-sm hover:font-medium hover:bg-gray-300 active:scale-110 font-extralight font-exo bg-background-grey rounded-2xl transition-all duration-200 min-h-16"}>Save
                changes
            </button>
            <img alt={"Close"}
                 id={"close_button"}
                 src={closeIcon}
                 className={"transition-all duration-300 absolute w-8 aspect-square top-4 right-4 opacity-50 hover:opacity-100 active:scale-110 z-10"}
                 onClick={() => (dispatch(closePopOverUpdateUiObject()))}/>
        </div>
    );
}

export default EditorPopOverEditUiElement;