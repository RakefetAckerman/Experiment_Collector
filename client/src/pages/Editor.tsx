import React from 'react';
import EditorToolSideBar from "../features/EditorToolSideBar/EditorToolSideBar.tsx";
import EditorPreview from "../features/EditorPreview/EditorPreview.tsx";
import {Provider} from "react-redux";
import editorStore from "../states/editor/editorStore.ts";
import EditorPopOverTrialType from "../features/EditorPopOver/EditorPopOverTrialType.tsx";

function Editor() {

    return (
        <Provider store={editorStore}>
            <EditorPopOverTrialType/>
            <div className={"w-full h-full flex flex-row"}>
                <EditorToolSideBar/>
                <EditorPreview/>
            </div>
        </Provider>
    );
}

export default Editor;