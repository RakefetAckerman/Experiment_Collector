import React from 'react';
import {getCurrentIndex, getIsSubmitDisabled} from "../../../utils/helperMethods.ts";
import {PageFlowOutput, UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import LoadingSpinner from "../../Loding/LoadingSpinner.tsx";

type SubmitButtonProps = {
    currentObj: UiObjects;
    pageFlow: PageFlowOutput[];
    onClickMethod: () => void;
    loadingSubmitButton: boolean;
}

function SubmitButton({currentObj, pageFlow, onClickMethod, loadingSubmitButton}: SubmitButtonProps) {
    const buttonCSSActions = `bg-white transition-all duration-500 hover:bg-buttons-blue`;
    const buttonCSSLocation = `mt-10`;
    const currentIndex = getCurrentIndex(pageFlow, currentObj);
    const isDisabled = getIsSubmitDisabled(pageFlow, currentIndex);
    const Shape = "border border-gray-200 p-5 drop-shadow-xl rounded-3xl  "

    return (
        <button onClick={onClickMethod} disabled={isDisabled || loadingSubmitButton}
                className={`flex items-center gap-0 justify-center 
                ${buttonCSSLocation} 
                ${isDisabled || loadingSubmitButton ? "opacity-30" : buttonCSSActions} 
                ${Shape} w-[40%] text-wrap max-laptop:w-full`}>
            {loadingSubmitButton ? <LoadingSpinner/> : <h2 className={`font-exo text-xl`}>{currentObj.text}</h2>
            }
        </button>
    )
        ;

}

export default SubmitButton;