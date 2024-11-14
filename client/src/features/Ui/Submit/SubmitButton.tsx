import React from 'react';
import {getCurrentIndex, getIsSubmitDisabled} from "../../../utils/helperMethods.ts";
import ButtonIcon from "../../../components/ButtonIcon.tsx";
import right_arrow from "../../../assets/right_arrow.svg";
import {PageFlowOutput, UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";

type SubmitButtonProps = {
    currentObj:UiObjects;
    pageFlow: PageFlowOutput[];
    onClickMethod:()=>void;
}
function SubmitButton({currentObj ,pageFlow ,onClickMethod}:SubmitButtonProps) {
    const buttonCSSActions = `bg-white transition-all duration-200 hover:bg-buttons-blue`;
    const buttonCSSLocation = `mt-10`;
    const currentIndex = getCurrentIndex(pageFlow, currentObj);
    const isDisabled = getIsSubmitDisabled(pageFlow, currentIndex);

    return <ButtonIcon text={currentObj.text} onClick={onClickMethod}
                       icon={right_arrow}
                       disabled={isDisabled}
                       className={`${buttonCSSLocation} ${isDisabled ? "opacity-30" : buttonCSSActions}`}/>
}

export default SubmitButton;