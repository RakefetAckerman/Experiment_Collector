import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import closeIcon from "../../assets/close.svg";
import {
    closePopOverAddItemToOrder, ItemsArrayWithId, setCurrentItem, updateItemsOrder,
} from "../../states/editor/editorSlice.ts";
import {toast} from "react-toastify";
import {isItemTypeEditor, ItemTypeEditor} from "../TrialType/types.ts";
import {ExperimentEditor} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {getUniqueTrialTypes} from "../../utils/helperMethods.ts";
import ChooseTrialTypeItem, {
    ParamsTrialTypeContainer,
    TrialTypeContainer
} from "../Ui/EditorUiComponenets/ChooseTrialTypeItem.tsx";


function getItemsByTrialType(trialType: string, experiment: ExperimentEditor): ItemTypeEditor[] {
    return experiment.items.filter(item => item.trialType === trialType);
}


function EditorPopOverAddItemToOrder() {
    const experiment = useSelector((state: EditorState) => (state.editor.editorPreview));
    const itemsOrder = useSelector((state: EditorState) => (state.editor.itemsOrder));
    const popOver = useSelector((state: EditorState) => (state.editor.popOverAddItemToOrder));
    const dispatch = useDispatch();
    const uniqueTrialTypes = getUniqueTrialTypes(experiment!.items);

    const separateByTrialType = () => {
        const newTrialTypes: TrialTypeContainer[] = [];
        for (const currentTrialType of uniqueTrialTypes) {
            const currentTrialTypeContainer: TrialTypeContainer = {
                items: getItemsByTrialType(currentTrialType!, experiment!),
                name: currentTrialType!
            }
            newTrialTypes.push(currentTrialTypeContainer);
        }
        return newTrialTypes;
    };

    const [trialTypes, setTrialTypes] = useState<ParamsTrialTypeContainer>({
        trialTypes: separateByTrialType(),
        currentItem: undefined
    });


    useEffect(() => {

    }, [popOver]);

    if (!popOver) {
        return null;
    }


    function saveTrialType() {
        if (!trialTypes.currentItem) {
            toast.error("choosing an item is required");
            return;
        }
        console.log({
            ...trialTypes.currentItem,
            id: generateUniqueId(getIds(experiment!)),
        })
        let newItem: ItemTypeEditor | ItemsArrayWithId = trialTypes.currentItem;
        if (isItemTypeEditor(trialTypes.currentItem)) {
            newItem = {
                ...trialTypes.currentItem,
                id: generateUniqueId(getIds(experiment!)),
            };
            dispatch(setCurrentItem(newItem));
        }
        console.log({
            newItem,
        })
        dispatch(updateItemsOrder([...itemsOrder!, newItem]))
        dispatch(closePopOverAddItemToOrder());
    }

    return (

        <div
            className={"overflow-y-scroll w-1/2 max-h-3/4 max-w-[600px] items-center z-10 relative rounded-3xl p-3 bg-white drop-shadow-lg flex flex-col gap-3"}>
            <h1 className={"text-center font-exo  text-clamping-mid mt-3"}>Add Item to experiment order</h1>

            {/*Ui Containers*/}
            <ChooseTrialTypeItem trialTypes={trialTypes} setTrialTypes={setTrialTypes}/>
            <button
                onClick={() => saveTrialType()}
                className={"w-44 text-clamping-sm hover:font-medium hover:bg-gray-300 active:scale-110 font-extralight font-exo bg-background-grey rounded-2xl transition-all duration-200 min-h-16"}>Save
                changes
            </button>
            <img alt={"Close"}
                 id={"close_button"}
                 src={closeIcon}
                 className={"transition-all duration-300 absolute w-8 aspect-square top-4 right-4 opacity-50 hover:opacity-100 active:scale-110 z-10"}
                 onClick={() => (dispatch(closePopOverAddItemToOrder()))}/>
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


export default EditorPopOverAddItemToOrder;