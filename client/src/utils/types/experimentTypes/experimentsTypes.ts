import {understandingInstructionOutput} from "../../../features/Ui/UnderstandingInstruction/types.ts";
import {TrialTypeType} from "../../../features/TrialType/types.ts";

enum ExperimentTypes {
    XRAY = "XRay",
    SLG = "SLG",
    CRA = "CRA",
    ANL = "ANL",
    CRT = "CRT",
    WC = "WC",
    TNG = "TNG",
    SDK = "SDK",
    PRM = "PRM",
    OTS = "OTS",
    NBT = "NBT",
    MM = "MM",
    MGCW = "MGCW",
    MDMP = "MDMP",
    ANG = "ANG",
}

export default ExperimentTypes;

export type Experiment = {
    name: string,
    objectDetails: object,
    trialTypes: string[]
}

export type UiObjects = {
    type: string,
    verifyButtonText?: string,
    urls?: string[],
    objectDetails?: object,
    text?: string,
    buttons?: string[],
    correct?: string,
    textLeft?: string,
    textCenter?: string,
    textRight?: string,
    headline?: string,
    semiHeadlines?: string[],
    scalePoints?: number,
    question?: string
    id?: string
    min?: number,
    max?: number,
    hint?: string,
    children?: UiObjects[],
    dynamicFlow?: boolean,
    nextIfCorrect: string,
    nextIfWrong: string
}


export type LikertOutput = {
    headline: string,
    id: string,
    output: number | null,
    responseTimeFirstLikert: number | null
}

export type SliderOutput = {
    id: string,
    confidence: number | null,
    responseTimeFirstJudgment: number | null,
}

export type PageFlowOutput = {
    id: string,
    type: string,
    output: string | number | null,
    responseTimeFirst: number | null,
    accuracy?: number | null, //only for buttons
    scalePoints?: number | null, //only for likert
    flowInstruction?: understandingInstructionOutput[] //only for Understanding Instruction
}