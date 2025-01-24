import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {
    closePopOverCreateItem, setCurrentItem, updateEditorExperiment,
} from "../../states/editor/editorSlice.ts";
import InputEditor from "../Ui/EditorUiComponenets/InputEditor.tsx";
import FeaturesEditor from "../Ui/EditorUiComponenets/FeaturesEditor.tsx";
import {Features} from "../../utils/features.ts";
import {toast} from "react-toastify";
import {ItemTypeEditor} from "../TrialType/types.ts";
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {newExperimentAddItem} from "../../utils/helperMethods.ts";

function EditorPopOverCreateItem() {
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview));
    const popOver = useSelector((state: EditorState) => (state.editor.popOverCreateItem));
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [features, setFeatures] = useState<Features>({
        zoom: false,
        idle: false,
        focus: false,
        mouseTracking: false,
    });

    useEffect(() => {
        setFeatures({
            zoom: false,
            idle: false,
            focus: false,
            mouseTracking: false,
        })
    }, [popOver]);

    if (!popOver) {
        return null;
    }


    function saveTrialType() {
        if (!name) {
            toast.error("Name is required");
            return;
        }
        const newObjectDetails = {features: features};
        const newItem: ItemTypeEditor = {
            id: generateUniqueId(getIds(experiment!)),
            name: name,
            objectDetails: newObjectDetails,
            children: getEmptyTrialType(experiment!, trialType),
            type: "item",
            trialType: trialType,
        }
        const newExperiment = newExperimentAddItem(newItem, experiment!);
        setName("");
        dispatch(setCurrentItem(newItem));
        dispatch(updateEditorExperiment(newExperiment));
        dispatch(closePopOverCreateItem());
    }

    return (

        <div
            className={"overflow-y-scroll w-1/2 max-h-3/4 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Item Creator</h1>
            <h2 className={"text-center font-exo  text-clamping-sm mt-3"}>Trial Type: {trialType}</h2>

            {/*Ui Containers*/}
            <InputEditor headline={"Name"} initialValue={""} setText={setName}/>
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
                 onClick={() => (dispatch(closePopOverCreateItem()))}/>
        </div>
    );
}

function getIds(experiment: ExperimentEditor) {
    const array = [];
    for (const trialType of experiment.items) {
        array.push(trialType.id);
    }
    return array;
}

function getEmptyTrialType(experiment: ExperimentEditor, trialTypeName: (string | undefined)) {
    if (!trialTypeName) return [];
    const item = experiment.items.find((item) => item.trialType === trialTypeName);
    if (!item) return [];
    return item.children;
}

function generateUniqueId(existingIds: string[]): string {
    const idLength = 6;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function createRandomId(): string {
        return Array.from({length: idLength}, () =>
            characters.charAt(Math.floor(Math.random() * characters.length))
        ).join('');
    }

    let newId = createRandomId();
    while (existingIds.includes(newId)) {
        newId = createRandomId();
    }

    return newId;
}


export default EditorPopOverCreateItem;