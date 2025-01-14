import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import InputEditor from "./InputEditor.tsx";
type Props = {
    uiObject: UiObjects;
    setUiObject: Dispatch<SetStateAction<UiObjects | undefined>>;
}
function EditHeadLine({uiObject , setUiObject }:Props) {
    const initialText = uiObject.text ? uiObject.text : "";
    const [text,setText] = useState<string>(initialText);
    useEffect(() => {
        setUiObject(prevState => {return {...prevState! ,text:text}});
    }, [text]);
    return (
        <div className={"w-full flex flex-col gap-2 items-center justify-start p-5"}>
            <InputEditor headline={"Headline Text"} setText={setText} initialValue={text}/>
        </div>
    );
}

export default EditHeadLine;