import {UiObjects} from "../utils/types/experimentTypes/experimentsTypes.ts";
import {ErrorType} from "./errorType.ts";
export function handleSliderError({min , max , textCenter , textLeft ,textRight , id} : UiObjects) : ErrorType{
    if (!min){
        return {errorMessage:"NO MIN VALUE SPECIFIED FOR THE SLIDER" , isError:true};
    }
    if (!max){
        return {errorMessage:"NO MAX VALUE SPECIFIED FOR THE SLIDER" , isError:true};
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