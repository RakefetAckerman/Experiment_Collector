export type understandingInstructionOutput = {
    id: string,
    correct?:string,
    outputEntered?:string,
    buttonType?:string,
    responseTimeFirstInstruction: number,
    accuracy?: 100 | 0,
}