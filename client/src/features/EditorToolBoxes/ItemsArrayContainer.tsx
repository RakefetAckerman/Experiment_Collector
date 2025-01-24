import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ItemTypeEditor} from "../TrialType/types.ts";
import {
    setCurrentItem,
    updateItemsOrder
} from "../../states/editor/editorSlice.ts";
import back_icon from "../../assets/back_icon.svg";
import {getRandomItem, removeItemFromOrder} from "../../utils/helperMethods.ts";
import deleteIcon from "../../assets/trash_bin_icon.svg";
import {EditorState} from "../../states/editor/editorStore.ts";

type Props = {
    items: ItemTypeEditor[] | undefined,
    id: string
}

function ItemsArrayContainer({items, id}: Props) {
    const itemsOrder = useSelector((state: EditorState) => (state.editor.itemsOrder));
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(true);
    if (!items || !id || items.length === 0) {
        return null;
    }

    return (
        <div
            className={"w-full flex flex-col items-center gap-5 opacity-60 hover:opacity-100 duration-200 transition-all "}>
            <div className={"flex flex-row items-center gap-2 w-full"}
                 onClick={() => dispatch(setCurrentItem(getRandomItem(items)))}
            >
                <img onClick={(e) => {
                    e.stopPropagation(); // Prevent parent onClick from firing
                    dispatch(setCurrentItem(undefined));
                    dispatch(updateItemsOrder(removeItemFromOrder({items, id}, itemsOrder!)));
                }} src={deleteIcon}
                     className={"w-6 h-6 active:scale-125 opacity-50 hover:opacity-100 duration-200 transition-all"}
                     alt={"remove item button"}/>
                <div
                    className={`w-full flex justify-between background-gradient
             transition-all duration-300 items-center relative h-14 border-gray-200 drop-shadow-sm p-4 rounded-xl`}
                >
                    <h1 className={"font-exo truncate max-w-44"}>{items[0].trialType}</h1>
                    <img src={back_icon} onClick={() => (setIsCollapsed(prev => !prev))}
                         className={`${isCollapsed ? "-rotate-90" : "rotate-90"} p-2 w-7 border-gray-300 border-solid border rounded-full transition-all duration-200
                      hover:bg-gray-500 active:scale-110 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 right-0`}
                         alt="image of a arrow"/>


                </div>
            </div>
            {!isCollapsed && items && items.map((item: ItemTypeEditor, index: number) => {
                return <div className={"ml-10 gap-3 w-[90%] flex justify-between items-center"}>
                    <div className={"w-2 h-2 bg-gray-500 rounded-full"}></div>
                    <div key={`item_${index}_${index}`}
                         className={`w-full h-14 flex justify-between bg-gray-200 hover:bg-gray-300
             transition-all duration-300 items-center relative border-gray-200 drop-shadow-sm p-4 rounded-xl`}
                    >
                        <h1 className={"font-exo truncate max-w-32"}>{item.name}</h1>
                        <h1 className={"truncate font-exo font-light"}><span
                            className={"opacity-30"}>Elements: </span>{item.children.length}</h1>
                    </div>
                </div>

            })}
        </div>
    );
}


export default ItemsArrayContainer;