import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {
    closePopOverTrialTypeCreator, setCurrentTrialType, updateEditorExperiment,
} from "../../states/editor/editorSlice.ts";
import InputEditor from "../Ui/EditorUiComponenets/InputEditor.tsx";
import FeaturesEditor from "../Ui/EditorUiComponenets/FeaturesEditor.tsx";
import {Features} from "../../utils/features.ts";
import {toast} from "react-toastify";
import {TrialTypeType} from "../TrialType/types.ts";
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";

function EditorPopOverCreateTrialType() {
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview));
    const popOver = useSelector((state: EditorState) => (state.editor.popOverCreateTrialType));

    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [features, setFeatures] = useState<Features>({
        zoom: false,
        idle: false,
        focus: false,
        mouseTracking: false,
    });

    if (!popOver) {
        return null;
    }


    function saveTrialType() {
        if (!name) {
            console.log("i am here");
            toast.error("Name is required");
            return;
        }
        const newObjectDetails = {features: features};
        const newTrialType: TrialTypeType = {
            id: generateUniqueId(getIds(experiment!)),
            name: name,
            objectDetails: newObjectDetails,
            children: [],
            type: "trialType"
        }
        const newExperiment = newExperimentUpdateTrialType(newTrialType, experiment!);
        setName("");
        dispatch(setCurrentTrialType(newTrialType));
        dispatch(updateEditorExperiment(newExperiment));
        dispatch(closePopOverTrialTypeCreator());
    }

    return (

        <div
            className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Trial Type Creator</h1>

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
                 onClick={() => (dispatch(closePopOverTrialTypeCreator()))}/>
        </div>
    );
}

function getIds(experiment: ExperimentEditor) {
    const array = [];
    for (const trialType of experiment.trialTypes) {
        array.push(trialType.id);
    }
    return array;
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

function newExperimentUpdateTrialType(trialType: TrialTypeType, experiment: ExperimentEditor): ExperimentEditor {
    const newTrialType = [...experiment.trialTypes, trialType];
    return {
        ...experiment, trialTypes: newTrialType
    };
}

export default EditorPopOverCreateTrialType;