import React from 'react';
import EditorToolSideBar from "../features/EditorToolSideBar/EditorToolSideBar.tsx";
import EditorPreview from "../features/EditorPreview/EditorPreview.tsx";
import {Provider} from "react-redux";
import editorStore from "../states/editor/editorStore.ts";
import EditorPopOverTrialType from "../features/EditorPopOver/EditorPopOverTrialType.tsx";
import EditorPopOverCreateTrialType from "../features/EditorPopOver/EditorPopOverCreateTrialType.tsx";
import EditorPopOverEditUiElement from "../features/EditorPopOver/EditorPopOverEditUiElement.tsx";
import {ToastContainer} from "react-toastify";

function Editor() {

    return (
        <Provider store={editorStore}>
            <div className={"top-0 left-0 absolute w-dvw h-dvh flex justify-center items-center"}>
                <ToastContainer/>
                <EditorPopOverTrialType/>
                <EditorPopOverCreateTrialType/>
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