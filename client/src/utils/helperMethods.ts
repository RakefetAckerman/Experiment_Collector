import {TrialType, UiObjects} from "./types/experimentTypes/experimentsTypes.ts";
import {BUTTONS, SLIDER} from "./constants.ts";

export function isOnlySubmitButton(trailType: TrialType) : boolean{
    return !trailType.children.some((e)=> e.type === BUTTONS);
}

export function getAnswersNeededBeforeSubmit(trailType: TrialType) : string[]{
    const array:string[] = [];
    for(const obj of trailType.children){
        if (obj.type === BUTTONS || obj.type === SLIDER){
            array.push("");
        }
    }
    return array;
}

export function getAnswerIndex(obj : UiObjects , trailType: TrialType) : number{
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