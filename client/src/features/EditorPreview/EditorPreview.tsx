import React from 'react';
import {useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import EditorTrialType from "./EditorTrialType.tsx";

function EditorPreview() {
    const experimentData = useSelector((state: EditorState) => (state.editor.editorPreview));
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const popOver = useSelector((state: EditorState) => (state.editor.popOver));

    if (!experimentData) {
        return null;
    }
    return (
        <div
            className={`${popOver ? "opacity-10" : "opacity-100"} relative gap 3px flex-col w-full h-full flex items-center p-5 transition-all duration-1000 ease-in-out`}>
            <h2 className={"font-exo text-center text-3xl uppercase"}>{experimentData!.name}</h2>
            {trialType && <EditorTrialType startTime={Date.now()} trialType={trialType} />}
        </div>
    );
}

export default EditorPreview;