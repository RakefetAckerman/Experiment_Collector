import {
    LikertOutput,
    PageFlowOutput,
    SliderOutput,
    UiObjects
} from "./types/experimentTypes/experimentsTypes.ts";
import {
    ElementsKeys,
    JWT_TOKEN,
    SERVER_ERROR_GENERAL,
    SERVER_NOT_RESPONDING,
    USER_KEY
} from "./constants.ts";
import {AxiosError} from "axios";
import {TokenType} from "../states/tokenType.ts";
import Cookies from "universal-cookie";
import {SerializedUser} from "./types/userTypes/userTypes.ts";
import {TrialTypeType} from "../features/TrialType/types.ts";

interface ErrorResponse {
    error?: string | { toString(): string };
}

export function getErrorData(error: AxiosError): string | undefined {
    if (!error.response) {
        return SERVER_NOT_RESPONDING;
    }

    const data = error.response.data as ErrorResponse;

    if (!data || !data.error) {
        return SERVER_ERROR_GENERAL;
    }

    if (typeof data.error === 'string') {
        return data.error;
    }

    if (typeof data.error.toString === 'function') {
        return data.error.toString();
    }

    return SERVER_ERROR_GENERAL;
}

export function getTokenFromBrowser(): TokenType | undefined {
    const cookies = new Cookies();
    const token = cookies.get(JWT_TOKEN);
    if (!token) {
        return undefined;
    }
    return token;
}

export function fetchUserUsingToken(token: TokenType | undefined): SerializedUser | undefined {
    if(!token){
        return undefined;
    }
    return undefined;
}

export function fetchUserFromSessionStorage(): SerializedUser | undefined {
    const value = sessionStorage.getItem(USER_KEY);
    if (value){
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error("Invalid data in sessionStorage", e);
        }
    }
    return undefined;
}


export function isSubmitButton(trialType: TrialTypeType): boolean {
    return trialType.children.some((e) => e.type === ElementsKeys.SUBMIT);
}

export function buildLikertArray(uiObjects: UiObjects[]) {
    const output:LikertOutput[] = [];
    uiObjects.forEach((value, _ ) => {
        if (value.type === ElementsKeys.LIKERT){
            const currentLikert:LikertOutput = {
                responseTimeFirstLikert:null,
                id:value.id!,
                headline:value.headline!,
                output:null
            };
            output.push(currentLikert);
        }
    })
    return output;
}

export function buildSliderArray(uiObjects: UiObjects[]) {
    const output:SliderOutput[] = [];
    uiObjects.forEach((value, _ ) => {
        if (value.type === ElementsKeys.SLIDER){
            const currentSlider:SliderOutput = {
                id:value.id!,
                confidence:null,
                responseTimeFirstJudgment:null
            };
            output.push(currentSlider);
        }
    })
    return output;
}

export function getCurrentIndex(pageFlow: PageFlowOutput[], uiObjects: UiObjects): number | null {
    for (let i = 0; i < pageFlow.length; i++) {
        if (uiObjects.id === pageFlow[i].id) {
            return i;
        }
    }
    return null;
}

export function getIsSubmitDisabled(pageFlow: PageFlowOutput[], currentIndex: number | null): boolean {
    if (!currentIndex || currentIndex === 0) {
        return false;
    }
    return !(pageFlow[currentIndex - 1].output);
}