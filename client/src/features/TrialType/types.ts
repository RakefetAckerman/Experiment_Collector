import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";

export type TrialTypeType = {
    id: string,
    objectDetails: object,
    children: UiObjects[],
    name: string | undefined,
    type?: "trialType",
}
