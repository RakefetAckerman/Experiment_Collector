import { UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {ErrorType} from "../../../error/errorType.ts";

export function handleTextInputErrors({id, hint , min}: UiObjects , index:number|null): ErrorType {
    if (!id) {
        return {isError: true, errorMessage: "No ID specified for TextInput"};
    }
    if (!hint && hint !== "") {
        return {isError: true, errorMessage: "No Hint specified for TextInput"};
    }
    if (!min && min !== 0){
        return {isError: true, errorMessage: "No min specified for TextInput"};
    }
    if (!index && index !== 0){
        return {isError: true, errorMessage: "Page Flow error for TextInput"};
    }

    return {isError: false, errorMessage: ""}
}