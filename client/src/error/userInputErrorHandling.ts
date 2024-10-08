import {ErrorType} from "./errorType.ts";

export function handleRegisterInputError(username: string, email: string): ErrorType {
    if (!username || username === "") {
        return {errorMessage: "Username is not provided", isError: true};
    }
    if (!email || email === "") {
        return {errorMessage: "Email address is not provided", isError: true};
    }
    if (username.length < 8) {
        return {errorMessage: "Username must include at least 8 characters", isError: true};
    }
    return {isError: false};
}

export function handleRegisterResearcherInputError(username: string, email: string, password: string, confirmPassword: string): ErrorType {
    if (!username || username === "") {
        return {errorMessage: "Username is not provided", isError: true};
    }
    if (!email || email === "") {
        return {errorMessage: "Email address is not provided", isError: true};
    }
    if (!password || password === "") {
        return {errorMessage: "Password is required", isError: true};
    }
    if (!isPasswordContainsLetterAndNumber(password)) {
        return {errorMessage: "Password must letters in english only and must contain also numbers", isError: true};
    }
    if (password.length < 8) {
        return {errorMessage: "Password must contain at least 8 characters", isError: true};
    }
    if (confirmPassword !== password) {
        return {errorMessage: "Password does not match the confirm password", isError: true};
    }
    if (username.length < 8) {
        return {errorMessage: "Username must contain at least 8 characters", isError: true};
    }
    return {isError: false};
}

export function handleLoginResearcherInputError(email: string, password: string): ErrorType {
    if (!email || email === "") {
        return {errorMessage: "Email address is not provided", isError: true};
    }
    if (!password || password === "") {
        return {errorMessage: "Password is required", isError: true};
    }
    if (!isPasswordContainsLetterAndNumber(password)) {
        return {errorMessage: "Password must letters in english only and must contain also numbers", isError: true};
    }
    if (password.length < 8) {
        return {errorMessage: "Password must contain at least 8 characters", isError: true};
    }
    return {isError: false};
}
export function handleLoginInputError(email: string): ErrorType {
    if (!email || email === "") {
        return {errorMessage: "Email address is not provided", isError: true};
    }
    return {isError: false};
}

function isPasswordContainsLetterAndNumber(password: string): boolean {
    let hasLetter = false;
    let hasNumber = false;

    for (const char of password) {
        if (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z') {
            hasLetter = true;
        } else if (char >= '0' && char <= '9') {
            hasNumber = true;
        }

        if (hasLetter && hasNumber) {
            break;
        }
    }

    return hasLetter && hasNumber;


}