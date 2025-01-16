import React from 'react';
import EditorToolSideBar from "../features/EditorToolSideBar/EditorToolSideBar.tsx";
import EditorPreview from "../features/EditorPreview/EditorPreview.tsx";
import {Provider} from "react-redux";
import editorStore from "../states/editor/editorStore.ts";
import EditorPopOverEditItem from "../features/EditorPopOver/EditorPopOverEditItem.tsx";
import EditorPopOverCreateItem from "../features/EditorPopOver/EditorPopOverCreateItem.tsx";
import EditorPopOverEditUiElement from "../features/EditorPopOver/EditorPopOverEditUiElement.tsx";
import {ToastContainer} from "react-toastify";

/**
 * The Editor Page for researcher and admins only! it is where researcher can edit there experiment and create new one.
 * @constructor
 */
function Editor() {

    return (
        <Provider store={editorStore}>
            <div className={"top-0 left-0 absolute w-dvw h-dvh flex justify-center items-center"}>
                <ToastContainer/>
                <EditorPopOverEditItem/>
                <EditorPopOverCreateItem/>
                <EditorPopOverEditUiElement/>
            </div>
                <div className={"w-full h-full flex flex-row"}>
                    <EditorToolSideBar/>
                    <EditorPreview/>
                </div>
        </Provider>
);
}

export default Editor;