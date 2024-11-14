import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {ErrorType} from "../../../error/errorType.ts";

export function handleHeadLineError({id, text}: UiObjects): ErrorType {
    if (!id) {
        return {isError: true, errorMessage: "No ID specified for HeadLine object"};
    }

    if (!text) {
        return {isError: true, errorMessage: "No text specified for HeadLine object"};
    }
    return {isError: false, errorMessage: ""}
}