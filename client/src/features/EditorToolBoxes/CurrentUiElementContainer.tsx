import React from 'react';
import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import penIcon from "../../assets/pen_icon.svg";

type Props = {
    uiObject: UiObjects;
}

function CurrentUiElementContainer({uiObject}: Props) {

    return (
        <div
            className={`w-full flex justify-between bg-gray-200 hover:bg-gray-300 cursor-pointer
             transition-all duration-300 items-center overflow-hidden min-h-16 border border-gray-200 drop-shadow-sm rounded-xl p-3 `}
        >
            <h1 className={"font-exo truncate"}>{uiObject.id}</h1>
            <div className={"flex flex-row items-center gap-4"}>
                <h1 className={"truncate font-exo font-light"}><span
                    className={"opacity-30"}>Type: </span>{uiObject.type}</h1>
                <img src={penIcon} alt="pen/edit icon"
                     className={"w-6 h-6 drop-shadow-md opacity-50 hover:opacity-100 transition-all duration-200 active:scale-125 "}/>
            </div>
        </div>
    );
}

export default CurrentUiElementContainer;