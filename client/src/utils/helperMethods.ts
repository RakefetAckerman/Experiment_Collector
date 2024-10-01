import {TrialTypeType, UiObjects} from "./types/experimentTypes/experimentsTypes.ts";
import {BUTTONS, SLIDER} from "./constants.ts";

export function isOnlySubmitButton(trailType: TrialTypeType) : boolean{
    return !trailType.children.some((e)=> e.type === BUTTONS);
}

export function getAnswersNeededBeforeSubmit(trailType: TrialTypeType) : string[]{
    const array:string[] = [];
    for(const obj of trailType.children){
        if (obj.type === BUTTONS || obj.type === SLIDER){
            array.push("");
        }
    }
    return array;
}

export function getAnswerIndex(obj : UiObjects , trailType: TrialTypeType) : number{
    let count:number = 0;
    for (const currObj of trailType.children){
        if ((currObj.type === BUTTONS || currObj.type === SLIDER)){
            if(currObj.id === obj.id){
                return count
            }
            count += 1;
        }
    }
    return -1;
}

export function isConfidenceTrialType(trailType: TrialTypeType):boolean {
    for (const currObj of trailType.children){
        if (currObj.type === SLIDER){
            return true;
        }
    }
    return false;
}

export function getInitialConfidence(trailType: TrialTypeType):number {
    for (const currObj of trailType.children){
        if (currObj.type === SLIDER){
            return Math.floor((currObj.max! + currObj.min! ) / 2);
        }
    }
    return -1;
}