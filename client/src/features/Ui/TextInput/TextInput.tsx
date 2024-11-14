import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import "./textinput.css"
import {PageFlowOutput, UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {handleTextInputErrors} from "./errors.ts";
import Error from "../../../error/Error.tsx";
import {getCurrentIndex} from "../../../utils/helperMethods.ts";
import {getIsTextInputDisabled} from "./helperMethods.ts";

type TextInputProps = {
    uiObject: UiObjects
    setPageFlow: Dispatch<SetStateAction<PageFlowOutput[]>>,
    pageFlow: PageFlowOutput[],
    startTime: number;
}

function TextInput({uiObject, setPageFlow, pageFlow, startTime}: TextInputProps) {
    const currentIndex = getCurrentIndex(pageFlow, uiObject);
    const error = handleTextInputErrors(uiObject, currentIndex);
    const [isDisabled, setIsDisabled] = useState<boolean>(getIsTextInputDisabled(pageFlow, currentIndex));
    // Updating the Disable state if the value of the other confidence in the page changed.
    useEffect(() => {
        if (!currentIndex) {
            return;
        }
        setIsDisabled(getIsTextInputDisabled(pageFlow, currentIndex));
    }, [pageFlow]);

    if (error.isError) {
        return <Error error={error}/>;
    }

    function textChanged(event: ChangeEvent<HTMLInputElement>) {
        // Updating the state of the response
        setPageFlow((prevState) => {
            let updatedElement: PageFlowOutput = prevState[currentIndex!];
            if (!updatedElement.responseTimeFirst) {
                updatedElement = {...updatedElement, responseTimeFirst: Date.now() - startTime}
            }
            if (uiObject.min! < event.target.value.length) {
                updatedElement = {
                    ...updatedElement,
                    output: event.target.value
                }
            }
            if (uiObject.min! > event.target.value.length) {
                updatedElement = {
                    ...updatedElement,
                    output: null
                }
            }
            return prevState.map((item, index) =>
                index === currentIndex ? updatedElement : item
            );
        })
    }


    return (
        <div className={`inputGroup ${isDisabled ? "opacity-30" : "opacity-100"}`}>
            <input className={"font-exo text-clamping-sm border-2 border-gray-200"} required={true} type="text"
                   autoComplete="off" onChange={(e) => textChanged(e)} disabled={isDisabled}/>
            <label className={"font-exo"}>{uiObject.hint}</label>
        </div>
    );
}

export default TextInput;