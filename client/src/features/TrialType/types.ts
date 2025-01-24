import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";

export type TrialTypeType = {
    id: string,
    objectDetails: object,
    children: UiObjects[],
    name: string | undefined,
    type?: "trialType",

}
export type ItemTypeEditor = {
    id: string,
    objectDetails: object,
    children: UiObjects[],
    name: string | undefined,
    type?: "item",
    trialType: string | undefined,
}


export function isItemTypeEditor(item: any): item is ItemTypeEditor {
    return (
        item &&
        typeof item.id === 'string' &&
        item.objectDetails !== undefined &&
        Array.isArray(item.children) &&  // Ensure 'children' is an array
        (item.name === undefined || typeof item.name === 'string') &&
        (item.trialType === undefined || typeof item.trialType === 'string')
    );
}
