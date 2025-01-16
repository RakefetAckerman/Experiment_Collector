import {ErrorType} from "../../error/errorType.ts";
import {isSubmitButton} from "../../utils/helperMethods.ts";
import {isUiElementsWithTheSameId} from "./helperMethods.ts";
import {ItemTypeEditor, TrialTypeType} from "./types.ts";

export function handleTrialTypeErrors(trialType: TrialTypeType| undefined | ItemTypeEditor): ErrorType {
    if (!trialType){
        return {isError: false, errorMessage: ""}
    }
    if (!trialType.id) {
        return {isError: true, errorMessage: "No ID specified for Trial type"};
    }
    if (!trialType.children) {
        return {isError: true, errorMessage: "No ui objects are mentioned for the current Trial type"};
    }

    if (!isSubmitButton(trialType)) {
        return {isError: true, errorMessage: "No submit button specified for Trial type"};
    }
    if (isUiElementsWithTheSameId(trialType.children)) {
        return {isError: true, errorMessage: "Two or more of ui objects in the trail type have the same id"};
    }

    return {isError: false, errorMessage: ""}
}
