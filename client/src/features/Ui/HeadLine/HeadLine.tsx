import React from 'react';
import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {handleHeadLineError} from "./errors.ts";
import Error from "../../../error/Error.tsx";

type HeadLineProps = {
    currentObj: UiObjects
}

function HeadLine({currentObj}: HeadLineProps) {
    const error = handleHeadLineError(currentObj);
    if (error.isError) {
        return <Error error={error}/>;
    }
    return <h2 className={"font-exo text-center text-clamping-mid max-w-[90%]"}> {currentObj.text!}</h2>
}

export default HeadLine;