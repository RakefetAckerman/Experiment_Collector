import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {ErrorType} from "../../../error/errorType.ts";

export function handleButtonsError({id, buttons , correct}: UiObjects): ErrorType {
    if (!id) {
        return {isError: true, errorMessage: "No ID specified for buttons object"};
    }
    if (!buttons) {
        return {isError: true, errorMessage: "No Buttons array specified for buttons object"};
    }
    if (buttons.length === 0) {
        return {isError: true, errorMessage: "Buttons array must include at list one string"};
    }
    if (buttons.length > 100) {
        return {isError: true, errorMessage: "Buttons array must be smaller then 100 buttons"};
    }
    if (!correct) {
        return {isError: true, errorMessage: "No Correct specified for buttons object"};
    }

    return {isError: false, errorMessage: ""}
}