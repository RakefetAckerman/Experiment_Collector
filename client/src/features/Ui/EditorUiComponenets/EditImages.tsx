import React, {Dispatch, SetStateAction, useState} from 'react';
import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {InputEditorArray} from "./inputEditorArray.tsx";

type Props = {
    uiObject: UiObjects;
    setUiObject: Dispatch<SetStateAction<UiObjects | undefined>>;
}
type InputItem = {
    id: string;
    value: string;
};

function EditImages({uiObject}: Props) {
    const initialText = uiObject.urls ? uiObject.urls : [];

    const [inputs, setInputs] = useState<InputItem[]>(() =>
        initialText.map((value, index) => ({
            id: String(index),
            value: value
        }))
    );
    const handleInputChange = (id: string, newValue: string) => {
        setInputs(inputs.map(input =>
            input.id === id ? { ...input, value: newValue } : input
        ));
    };

    return (
        <div className={"w-full flex flex-col gap-2 items-center justify-start p-5"}>
            <InputEditorArray headline={"Url-"}
                              initialValues={initialText}
                              handleInputChange={handleInputChange}
                              inputs={inputs} setInputs={setInputs}/>
        </div>
    );
}

export default EditImages;