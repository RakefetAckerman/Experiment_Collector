import {ErrorType} from "./errorType.ts";

type ErrorProps=  {
    error: ErrorType;
}
function Error({error}: ErrorProps) {
    const css = "text-clamping-mid rounded-xl p-5 bg-red-50 border border-red-200 text-red-700";
    return (
        <h1 className={css}>{error.errorMessage}</h1>
    );
}

export default Error;