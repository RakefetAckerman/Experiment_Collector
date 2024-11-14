import React from 'react';
import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {handleHeadLineError} from "../HeadLine/errors.ts";
import Error from "../../../error/Error.tsx";
type TextProps = {
    currentObj: UiObjects
}
function Text({currentObj}: TextProps) {
    const error = handleHeadLineError(currentObj);
    if (error.isError) {
        return <Error error={error}/>;
    }
    return <h2 className={"font-exo text-clamping-sm max-w-[80%]"} > {currentObj.text!}</h2>
}

export default Text;