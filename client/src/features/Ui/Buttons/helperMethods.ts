import {PageFlowOutput} from "../../../utils/types/experimentTypes/experimentsTypes.ts";

export function getIsButtonDisabled(pageFlow: PageFlowOutput[], currentIndex: number | null): boolean {
    if (!currentIndex || currentIndex === 0) {
        return false;
    }
    return !(pageFlow[currentIndex - 1].output);
}
