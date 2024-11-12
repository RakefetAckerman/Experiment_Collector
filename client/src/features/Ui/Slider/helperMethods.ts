import {PageFlowOutput, UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";

export function getCalcForSliderAnimation(uiObject: UiObjects, value: number, KNOB_SIZE: number) {
    const min = uiObject.min!;
    const max = uiObject.max!;

    const total_range = max - min;
    const value_position = value - min;
    const percentage = (value_position / total_range) * 100;
    const drift = (-KNOB_SIZE / 100) * percentage + KNOB_SIZE / 2;
    return {drift, percentage, min, max}
}

export function average({min, max}: UiObjects) {
    if (!min || !max) {
        return null;
    }
    return Math.floor((min + max) / 2)
}

export function getIsSliderDisabled(pageFlow: PageFlowOutput[], currentIndex: number | null): boolean {
    if (!currentIndex || currentIndex === 0) {
        return false;
    }
    return !(pageFlow[currentIndex - 1].output);
}
