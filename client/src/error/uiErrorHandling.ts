import {UiObjects} from "../utils/types/experimentTypes/experimentsTypes.ts";
import {ErrorType} from "./errorType.ts";
export function handleSliderError({min , max , textCenter , textLeft ,textRight , id} : UiObjects) : ErrorType{
    if (!min){
        return {errorMessage:"NO MIN VALUE SPECIFIED FOR THE SLIDER" , isError:true};
    }
    if (!max){
        return {errorMessage:"NO MAX VALUE SPECIFIED FOR THE SLIDER" , isError:true};
    }
    if (max <= min){
        return {errorMessage:"MAX VALUE MUST BE GREATER THEN THE MIN VALUE" , isError:true};
    }
    if (!textCenter){
        return {errorMessage:"NO CENTER TEXT SPECIFIED FOR THE SLIDER" , isError:true};
    }
    if (!textLeft){
        return {errorMessage:"NO TEXT LEFT SPECIFIED FOR THE SLIDER" , isError:true};
    }
    if (!textRight){
        return {errorMessage:"NO TEXT RIGHT SPECIFIED FOR THE SLIDER" , isError:true};
    }
    if (!id){
        return {errorMessage:"NO ID SPECIFIED FOR THE SLIDER" , isError:true};
    }
    return {isError:false};
}

export function handleLikertError({id, headline, semiHeadlines, scalePoints}: UiObjects): ErrorType {
    if (!id) {
        return {isError: true, errorMessage: "No ID specified for Likert"};
    }
    if (!headline && headline !== "") {
        return {isError: true, errorMessage: "No Headline specified for Likert"};
    }
    if (!semiHeadlines) {
        return {isError: true, errorMessage: "No Semi Headline specified for Likert"};
    }
    if (!scalePoints && scalePoints !== 0) {
        return {isError: true, errorMessage: "No Scale Points specified for Likert"};
    }
    if (scalePoints > 100) {
        return {isError: true, errorMessage: "Scale Points can't be larger then 100"};
    }

    return {isError: false, errorMessage: ""}
}

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
    if (!correct) {
        return {isError: true, errorMessage: "No Correct specified for buttons object"};
    }

    return {isError: false, errorMessage: ""}
}