import {TrialTypeType, UiObjects} from "./types/experimentTypes/experimentsTypes.ts";
import {BUTTONS, JWT_TOKEN, SERVER_ERROR_GENERAL, SERVER_NOT_RESPONDING, SLIDER} from "./constants.ts";
import {AxiosError} from "axios";
import {TokenType} from "./tokenType.ts";
import Cookies from "universal-cookie";
import {SerializedUser} from "./types/userTypes/userTypes.ts";

export function isOnlySubmitButton(trailType: TrialTypeType): boolean {
    return !trailType.children.some((e) => e.type === BUTTONS);
}

export function getAnswersNeededBeforeSubmit(trailType: TrialTypeType): string[] {
    const array: string[] = [];
    for (const obj of trailType.children) {
        if (obj.type === BUTTONS || obj.type === SLIDER) {
            array.push("");
        }
    }
    return array;
}

export function getAnswerIndex(obj: UiObjects, trailType: TrialTypeType): number {
    let count: number = 0;
    for (const currObj of trailType.children) {
        if ((currObj.type === BUTTONS || currObj.type === SLIDER)) {
            if (currObj.id === obj.id) {
                return count
            }
            count += 1;
        }
    }
    return -1;
}

export function isConfidenceTrialType(trailType: TrialTypeType): boolean {
    for (const currObj of trailType.children) {
        if (currObj.type === SLIDER) {
            return true;
        }
    }
    return false;
}

export function getInitialConfidence(trailType: TrialTypeType): number {
    for (const currObj of trailType.children) {
        if (currObj.type === SLIDER) {
            return Math.floor((currObj.max! + currObj.min!) / 2);
        }
    }
    return -1;
}

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
    return undefined;
}

export function fetchUserUsingToken(token: TokenType | undefined): SerializedUser | undefined {
    return undefined;
}