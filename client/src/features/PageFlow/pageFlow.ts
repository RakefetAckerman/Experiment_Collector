import {PageFlowOutput, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {ElementsKeys} from "../../utils/constants.ts";

export function getPageFlowOutput(uiObjects: UiObjects[]): PageFlowOutput[] {
    const output: PageFlowOutput[] = [];
    uiObjects.forEach((value) => {
        if (value.type === ElementsKeys.SLIDER || value.type === ElementsKeys.LIKERT || value.type === ElementsKeys.BUTTONS || value.type === ElementsKeys.SUBMIT
            || value.type === ElementsKeys.UNDERSTANDING_INSTRUCTION || value.type === ElementsKeys.TEXT_INPUT) {
            const currentElement: PageFlowOutput = {
                id: value.id!,
                type: value.type,
                responseTimeFirst: null,
                output: null
            };
            output.push(currentElement);
        }
    })
    return output;
}


function updateOutputForButton(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`Response-${currentElement.id}`]: {
            Response: currentElement.output,
            ResponseTimeFirst: currentElement.responseTimeFirst,
            Accuracy: currentElement.accuracy
        }
    }
}

function updateOutputForSlider(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`Judgment-${currentElement.id}`]: {
            Judgment: currentElement.output,
            ResponseTimeFirstJudgment: currentElement.responseTimeFirst,
        }
    }
}

function updateOutputForLikert(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`Likert-${currentElement.id}`]: {
            Value: currentElement.output,
            ResponseTimeFirstLikert: currentElement.responseTimeFirst,
            ScalePoint: currentElement.scalePoints
        }
    }
}

function updateOutputForVerifyInstruction(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`VerifyUnderstanding-${currentElement.id}`]: currentElement.flowInstruction,
    }
}

export function updateOutputFromPageFlow(output: object, pageFlow: PageFlowOutput[]) {
    let updatedOutput: object = {...output};
    for (let i = 0; i < pageFlow.length; i++) {
        const currentElement: PageFlowOutput = pageFlow[i];
        if (currentElement.type === ElementsKeys.BUTTONS) {
            updatedOutput = updateOutputForButton(updatedOutput, currentElement);
        }
        if (currentElement.type === ElementsKeys.SLIDER) {
            updatedOutput = updateOutputForSlider(updatedOutput, currentElement);
        }
        if (currentElement.type === ElementsKeys.LIKERT) {
            updatedOutput = updateOutputForLikert(updatedOutput, currentElement);
        }
        if (currentElement.type === ElementsKeys.UNDERSTANDING_INSTRUCTION) {
            updatedOutput = updateOutputForVerifyInstruction(updatedOutput, currentElement);
        }
    }
    return updatedOutput;
}
