import {PageFlowOutput} from "../../utils/types/experimentTypes/experimentsTypes.ts";

export  function getIsVerifyDisabled(pageFlow:PageFlowOutput[],currentIndex:number){
    if (!currentIndex || currentIndex === 0) {
        return false;
    }
    return !(pageFlow[currentIndex - 1].output);
}