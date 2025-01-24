import React from 'react';
import ItemContainer from "./ItemContainer.tsx";
import {useDispatch} from "react-redux";
import {
    ItemsArrayWithId,
    openPopOverAddItemToOrder,
    setCurrentItem
} from "../../states/editor/editorSlice.ts";
import plusIcon from "../../assets/plus_icon_solar_bold.svg"
import {isItemTypeEditor, ItemTypeEditor} from "../TrialType/types.ts";
import ItemsArrayContainer from "./ItemsArrayContainer.tsx";

type Props = {
    itemsOrder: (ItemTypeEditor | ItemsArrayWithId)[],
    isCollapsed: boolean,
}

function BoxItemsOrder({itemsOrder, isCollapsed}: Props) {
    const dispatch = useDispatch();

    return (
        <div
            className={`${isCollapsed ? "h-40" : "min-h-96 "} transition-all duration-1000 relative w-full flex flex-col items-center bg-background-grey border border-gray-100 shadow-md rounded-xl p-3 gap-2`}>
            <h1 className={`font-exo font-extralight text-clamping-sm truncate transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>Items</h1>
            <h2 className={`font-exo font-bold text-clamping-sm truncate transition-all duration-500 ${!isCollapsed ? "opacity-0 h-0" : "opacity-100 -mb-10 "}`}>{itemsOrder.length}</h2>
            <div
                className={`${isCollapsed ? "opacity-0 h-0" : "opacity-100 "} w-full relative flex flex-row justify-between items-center`}>
                <h3 className={"text-clamping-sm text-center w-full font-exo font-light opacity-55 truncate"}>Experiment
                    Order</h3>
            </div>
            {!isCollapsed && <>
                <div
                    className={`p-5 w-[95%] flex flex-col overflow-y-scroll mb-5 justify-start items-center gap-3 ${isCollapsed ? "opacity-0 h-0" : "opacity-100 "}`}>
                    {itemsOrder.map((itemArrayType) =>
                        isItemTypeEditor(itemArrayType) ? <ItemContainer key={`${itemArrayType.id}$trialType`} item={itemArrayType}/> :
                            <ItemsArrayContainer items={itemArrayType.items} id={`${itemArrayType.id}`}/>
                    )}
                    <img src={plusIcon}
                         onClick={() => {
                             dispatch(setCurrentItem(undefined));
                             dispatch(openPopOverAddItemToOrder());
                         }}
                         className={"w-14 h-14 opacity-35 hover:opacity-100 duration-200 transition-all active:scale-125 cursor-pointer"}
                         alt={"plus icon"}/>
                </div>
            </>
            }

        </div>

    );
}


export default BoxItemsOrder;