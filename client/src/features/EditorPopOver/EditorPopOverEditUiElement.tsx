import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import closeIcon from "../../assets/close.svg";
import {
    closePopOverUpdateUiObject, setCurrentTrialType,
} from "../../states/editor/editorSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import DropDownType from "../Ui/EditorUiComponenets/DropDownType.tsx";
import {ElementsKeys, ElementTypeArray} from "../../utils/constants.ts";
import EditImages from "../Ui/EditorUiComponenets/EditImages.tsx";
import {UpdateUiObjectTrialType} from "../../utils/helperMethods.ts";
import EditHeadLine from "../Ui/EditorUiComponenets/EditHeadLine.tsx";

function EditorPopOverEditUiElement() {
    const dispatch = useDispatch();
    const popOver = useSelector((state: EditorState) => (state.editor.popOverUpdateUiObject));
    const currentTrialType = useSelector((state: EditorState) => (state.editor.currentTrialType));
    const currentUiObject = useSelector((state: EditorState) => (state.editor.currentUiObject));
    const [uiObjectInternal, setUiObjectInternal] = useState<UiObjects | undefined>(currentUiObject);

    useEffect(() => {
        setUiObjectInternal(currentUiObject);
    }, [currentUiObject])

    if (!popOver || !currentUiObject || !uiObjectInternal) {
        return null;
    }


    function saveUiObject() {
        console.log("saveElement");
        // TODO UPDATE THE EXPERIMENT AND THE CURRENT TRIAL TYPE AS NEEDED
        const newTrialType = UpdateUiObjectTrialType(currentTrialType!,uiObjectInternal!);
        dispatch(setCurrentTrialType(newTrialType));
        dispatch(closePopOverUpdateUiObject());
    }

    function renderUiElementEditor(uiObject:UiObjects , setUiObject:Dispatch<SetStateAction<UiObjects|undefined>>) {
        switch (uiObject.type) {
            case ElementsKeys.IMAGES:
                return <EditImages uiObject={uiObject} setUiObject={setUiObject}/>;
            case ElementsKeys.HEADLINE:
                return <EditHeadLine uiObject={uiObject} setUiObject={setUiObject}/>;
            case ElementsKeys.TEXT:
                return <></>;
            case ElementsKeys.BUTTONS:
                return <></>;
            case ElementsKeys.SLIDER:
                return <></>;
            case ElementsKeys.LIKERT:
                return <></>;
            case ElementsKeys.UNDERSTANDING_INSTRUCTION:
                return <></>;
            case ElementsKeys.TEXT_INPUT:
                return <></>;
            case ElementsKeys.SUBMIT:
                return <></>;
        }

        return undefined;
    }

    return (
        <div
            className={"overflow-y-scroll w-1/2 h-1/2 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Update Ui Element</h1>

            {/*Ui renderer*/}
            <div className={"w-[80%] flex flex-col gap-3"}>
                <DropDownType currentUiObject={uiObjectInternal!} options={ElementTypeArray}
                              setCurrentUiObject={setUiObjectInternal}/>
                {renderUiElementEditor(uiObjectInternal, setUiObjectInternal)}
            </div>
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