// <div key={key} className={buttonContainerCSS}>
//     {currentObj.buttons!.map(
//         (value, buttonIndex) => <Button
//             disabled={isDisabled}
//             className={isDisabled ? (value !== answer[answerIndex] ? "opacity-30" : "bg-blue-300") : "bg-white"}
//             onClick={() => handleAnswerSet({
//                 answerClicked: value,
//                 answerIndex: answerIndex,
//                 object: currentObj
//             })}
//             key={`${key}-button-${buttonIndex}`}>{value}</Button>)}
// </div>
import {PageFlowOutput, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {handleButtonsError} from "../../error/uiErrorHandling.ts";
import Error from "../../error/Error.tsx";
import Button from "./Button.tsx";
import {number} from "yup";
import {getCurrentIndex} from "../../utils/helperMethods.ts";

type ButtonsProps = {
    uiObject: UiObjects,
    setPageFlow: Dispatch<SetStateAction<PageFlowOutput[]>>,
    pageFlow: PageFlowOutput[],
    startTime: number;
}

function getIsButtonDisabled(pageFlow: PageFlowOutput[], currentIndex: number | null): boolean {
    if (!currentIndex || currentIndex === 0) {
        return false;
    }
    return !(pageFlow[currentIndex - 1].output);
}

function Buttons({uiObject, setPageFlow, pageFlow, startTime}: ButtonsProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [elementOutput, setElementOutput] = useState<{ value: string, index: number } | null>(null);
    const currentIndex = getCurrentIndex(pageFlow, uiObject);
    const [isContainerDisabled, setIsContainerDisabled] = useState<boolean>(getIsButtonDisabled(pageFlow, currentIndex));
    const error = handleButtonsError(uiObject);

    // Updating the Disable state if the value of the other confidence in the page changed.
    useEffect(() => {
        if (!currentIndex) {
            return;
        }
        setIsContainerDisabled(getIsButtonDisabled(pageFlow, currentIndex));
    }, [pageFlow])

    //Showing error if needed
    if (error.isError) {
        return <Error error={error}/>;
    }

    function handleClick(index: number, value: string) {
        setElementOutput({index, value});
        setIsDisabled(true);
        // Updating the state of the response
        setPageFlow((prevState) => {
            let updatedElement: PageFlowOutput = prevState[currentIndex!];
            if (!updatedElement.responseTimeFirst) {
                updatedElement = {...updatedElement, responseTimeFirst: Date.now() - startTime}
            }
            updatedElement = {
                ...updatedElement,
                output: value,
                accuracy: value === uiObject.correct ? 100 : 0
            }
            return prevState.map((item, index) =>
                index === currentIndex ? updatedElement : item
            );
        })
    }

    return (
        <div id={"buttons_container"}
             className={`w-full flex gap-4 justify-center flex-row max-tablet:flex-col flex-wrap ${isContainerDisabled ? "opacity-30" : "opacity-100"}`}>
            {uiObject.buttons!.map((value, index) => {
                const sizeAndShape = "max-w-[300px] rounded-xl"
                const marginAndPadding = "p-4 flex-1 "
                const borderAndShadow = "border border-gray-300 drop-shadow-xl "
                const animation = "transition-all duration-300 "
                const hover = elementOutput ? "" : "hover:bg-buttons-blue"
                const backgroundColor = (index === elementOutput?.index) ? "bg-buttons-blue" : ""
                const Disabled = elementOutput && isDisabled && (index !== elementOutput?.index) ? "opacity-30" : "opacity-100";
                return <button
                    className={`active:scale-110  text-clamping-sm ${Disabled} ${backgroundColor} ${hover} ${sizeAndShape} ${marginAndPadding} ${borderAndShadow} ${animation}`}
                    onClick={() => handleClick(index, value)}
                    key={"buttons_element" + index}
                    disabled={isDisabled || isContainerDisabled}
                >{value}</button>
            })}
        </div>
    );
}

export default Buttons;