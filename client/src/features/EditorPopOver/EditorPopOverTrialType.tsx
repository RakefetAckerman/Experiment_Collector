import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {
    closePopOverTrialTypeEditor,
    setCurrentTrialType,
    setPopOverTrialTypeEditor,
    updateEditorExperiment
} from "../../states/editor/editorSlice.ts";
import InputEditor from "../Ui/EditorUiComponenets/InputEditor.tsx";
import FeaturesEditor from "../Ui/EditorUiComponenets/FeaturesEditor.tsx";
import getFeatures, {Features} from "../../utils/features.ts";
import {ToastContainer} from "react-toastify";
import {TrialTypeType} from "../TrialType/types.ts";
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";

function EditorPopOverTrialType() {
    const trialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview));

    const popOver = useSelector((state: EditorState) => (state.editor.popOverTrialTypeEditor));

    const [name, setName] = useState("");
    const [features, setFeatures] = useState<Features>(getFeatures(trialType));
    const dispatch = useDispatch();

    useEffect(() => {
        setFeatures(getFeatures(trialType));
    }, [popOver, trialType]);

    if (!popOver) {
        return null;
    }

    if (!trialType) {
        dispatch(closePopOverTrialTypeEditor());
        return null;
    }

    function saveTrialType() {
        if (!trialType) {
            console.log("err", {trialType, text: name});
            return;
        }
        const newName = name ? name : trialType!.name;
        const newObjectDetails = {...trialType!.objectDetails, features: features};
        const newTrialType: TrialTypeType = {...trialType, objectDetails: newObjectDetails, name: newName};
        const newExperiment = newExperimentUpdateTrialType(newTrialType, experiment!);
        dispatch(setCurrentTrialType(newTrialType));
        dispatch(updateEditorExperiment(newExperiment))
        dispatch(closePopOverTrialTypeEditor());
    }

    return (
        <div
            className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Trial Type Editor</h1>
            <h2 className={"opacity-55 max-w-full min-h-[2rem] truncate font-exo text-clamping-sm"}>Trial Type
                ID:{trialType.id}</h2>

            {/*Ui Containers*/}
            <InputEditor headline={"Name"} initialValue={trialType.name ? trialType.name : ""} setText={setName}/>
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
                 onClick={() => (dispatch(setPopOverTrialTypeEditor()))}/>
        </div>
    );
}

function newExperimentUpdateTrialType(trialType: TrialTypeType, experiment: ExperimentEditor): ExperimentEditor {
    return {
        ...experiment,
        trialTypes: experiment.trialTypes.map(currentType =>
            currentType.id === trialType.id ? trialType : currentType
        )
    };
}

export default EditorPopOverTrialType;