import {TrialType} from "./types/experimentTypes/experimentsTypes.ts";
import {BUTTONS} from "./constants.ts";

export function isOnlySubmitButton(trailType: TrialType) : boolean{
    return !trailType.children.some((e)=> e.type === BUTTONS);
}