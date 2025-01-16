import React from 'react';
import {useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import EditorItemRenderer from "./EditorItemRenderer.tsx";

function EditorPreview() {
    const experimentData = useSelector((state: EditorState) => (state.editor.editorPreview));
    const item = useSelector((state: EditorState) => (state.editor.currentItem));

    if (!experimentData) {
        return null;
    }
    return (
        <div
            className={`opacity-100 relative gap 3px flex-col w-full h-full flex items-center p-5 transition-all duration-1000 ease-in-out`}>
            <h2 className={"font-exo text-center text-3xl uppercase"}>{experimentData!.name}</h2>
            {item && <EditorItemRenderer startTime={Date.now()} item={item} />}
        </div>
    );
}

export default EditorPreview;