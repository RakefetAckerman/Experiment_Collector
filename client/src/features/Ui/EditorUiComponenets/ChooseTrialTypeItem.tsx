import React, {SetStateAction, useState} from 'react';
import back_icon from "../../../assets/back_icon.svg";
import {isItemTypeEditor, ItemTypeEditor} from "../../TrialType/types.ts";
import {ItemsArrayWithId} from "../../../states/editor/editorSlice.ts";

export type TrialTypeContainer = {
    name: string;
    items: ItemTypeEditor[];
}
export type ParamsTrialTypeContainer = {
    trialTypes: TrialTypeContainer[];
    currentItem: ItemTypeEditor | undefined | ItemsArrayWithId;
}

export interface ChooseTrialTypeProps {
    trialTypes: ParamsTrialTypeContainer,
    setTrialTypes: React.Dispatch<SetStateAction<ParamsTrialTypeContainer>>
}

function ChooseTrialTypeItem({setTrialTypes, trialTypes}: ChooseTrialTypeProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={"w-[90%] min-h-50 flex flex-col justify-center items-center bg-background-grey border p-5 rounded-2xl transition-all duration-500"}>
            <div className={"w-full flex flex-row"}>
                <h2 className={"text-left text-clamping-mid font-exo font-extralight w-full"}>Available Items</h2>
                <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                     className={`${isCollapsed ? "-rotate-90" : "rotate-90"} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 `}
                     alt="image of a arrow"/>
            </div>
            {trialTypes?.trialTypes && <div
                className={`w-full  flex flex-col gap-2 mt-3 ${isCollapsed ? "h-0 " : "h-60 overflow-y-scroll"} overflow-hidden transition-all duration-500`}>
                {trialTypes?.trialTypes && trialTypes.trialTypes.map(item => {
                    return <ItemSelector key={`${item.name}sf+`} trialTypeContainer={item} state={{setTrialTypes, trialTypes}}/>
                })}
            </div>}
        </div>

    );
}

function ItemSelector({trialTypeContainer, state}: {
    trialTypeContainer: TrialTypeContainer,
    state: ChooseTrialTypeProps,
}) {
    const isCurrentTrialTypeSelected = state.trialTypes.currentItem && !isItemTypeEditor(state.trialTypes.currentItem)
        && state.trialTypes.currentItem.items.length > 0 && state.trialTypes.currentItem.items[0].trialType === trialTypeContainer.name ;
    return <div className={"w-[90%] ml-2"}>
        <h2 className={`${isCurrentTrialTypeSelected ? "opacity-100 gradient-text font-bold " : "opacity-55 hover:opacity-100 "} font-exo text-clamping-sm cursor-pointer `}
            onClick={() => {
                state.setTrialTypes(prev => ({
                    ...prev,
                    currentItem: {
                        items: trialTypeContainer.items,
                        id: `${trialTypeContainer.name}+ID_${generateRandomString()}`
                    }
                }));
            }}
        >{trialTypeContainer.name}</h2>
        <ul className={"w-full ml-2 flex flex-col gap-2 pt-3 pb-3"}>
            {trialTypeContainer.items.map((value, index) => (
                <li key={`${index}-${value.id!}`}
                    onClick={() => {
                        state.setTrialTypes(prev => ({...prev, currentItem: value}));
                    }}
                    className={`${value === state.trialTypes?.currentItem ? "bg-gray-300" : "hover:bg-gray-200 bg-white"} font-extralight text-clamping-sm font-exo w-full  p-3 rounded-xl
                     drop-shadow transition-all duration-200 cursor-pointer`}> <span className={`${value === state.trialTypes?.currentItem ? "gradient-text font-bold" : "text-black"}`}>{`${value.name}`}</span></li>
            ))}
        </ul>
    </div>
}

function generateRandomString(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Set of characters to choose from
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);  // Get a random index
        result += characters.charAt(randomIndex);  // Add the character to the result string
    }

    return result;
}

export default ChooseTrialTypeItem;