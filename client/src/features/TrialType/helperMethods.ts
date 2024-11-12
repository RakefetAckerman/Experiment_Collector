import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";

export function isUiElementsWithTheSameId(children: UiObjects[]) {
    for (const child of children) {
        let isAlready = false;
        for (const child2 of children) {
            if (child.id == child2.id && isAlready) {
                return true
            }
            if (child.id == child2.id) {
                isAlready = true;
            }
        }
    }
    return false;
}