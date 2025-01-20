import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {
    closePopOverEditItem,
    setCurrentItem,
    updateEditorExperiment
} from "../../states/editor/editorSlice.ts";
import InputEditor from "../Ui/EditorUiComponenets/InputEditor.tsx";
import FeaturesEditor from "../Ui/EditorUiComponenets/FeaturesEditor.tsx";
import getFeatures, {Features} from "../../utils/features.ts";
import {ItemTypeEditor} from "../TrialType/types.ts";
import {newExperimentUpdateItem} from "../../utils/helperMethods.ts";

function EditorPopOverEditItem() {
    const Item = useSelector((state: EditorState) => (state.editor.currentItem));
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview));

    const popOver = useSelector((state: EditorState) => (state.editor.popOverEditItem));

    const [name, setName] = useState("");
    const [features, setFeatures] = useState<Features>(getFeatures(Item));
    const dispatch = useDispatch();

    useEffect(() => {
        setFeatures(getFeatures(Item));
    }, [popOver, Item]);

    if (!popOver) {
        return null;
    }

    if (!Item) {
        dispatch(closePopOverEditItem());
        return null;
    }

    function saveTrialType() {
        if (!Item) {
            console.log("err", {trialType: Item, text: name});
            return;
        }
        const newName = name ? name : Item!.name;
        const newObjectDetails = {...Item!.objectDetails, features: features};
        const newItem: ItemTypeEditor = {...Item, objectDetails: newObjectDetails, name: newName};
        const newExperiment = newExperimentUpdateItem(newItem, experiment!);
        dispatch(setCurrentItem(newItem));
        dispatch(updateEditorExperiment(newExperiment))
        dispatch(closePopOverEditItem());
    }

    return (
        <div
            className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3 uppercase"}>Items Editor</h1>
            <h2 className={"opacity-55 max-w-full min-h-[2rem] truncate font-exo text-clamping-sm"}>Item
                ID:{Item.id}</h2>
            <h2 className={"opacity-80 max-w-full min-h-[2rem] truncate font-exo text-clamping-sm -mt-3"}><span
                className={"opacity-55"}>
                Trail-Type:</span> {Item.trialType}</h2>
            {/*Ui Containers*/}
            <InputEditor headline={"Name"} initialValue={Item.name ? Item.name : ""} setText={setName}/>
            <FeaturesEditor features={features} setFeatures={setFeatures}/>
            <button
                onClick={() => saveTrialType()}
                className={"w-44 text-clamping-sm hover:font-medium hover:bg-gray-300 active:scale-110 font-extralight font-exo bg-background-grey rounded-2xl transition-all duration-200 min-h-16"}>Save
                changes
            </button>
            <img alt={"Close"}
                 id={"close_button"}
                 src={closeIcon}
                 className={"transition-all duration-300 absolute w-8 aspect-square top-4 right-4 opacity-50 hover:opacity-100 active:scale-110 z-10"}
                 onClick={() => (dispatch(closePopOverEditItem()))}/>
        </div>
    );
}


export default EditorPopOverEditItem;