import {Dispatch, SetStateAction} from "react";

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
    trailTypes: TrialTypeType[]
}
export type TrialTypeType = {
    id: string,
    objectDetails: object,
    children: UiObjects[],
}

export type UiObjects = {
    type: string,
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
    scalePoints?:number,
    id?:string
    min?: number,
    max?: number,
}



export type LikertOutput = {
    headline: string,
    id: string,
    output: number | null,
    responseTimeFirstLikert:number|null
}

export type SliderOutput = {
    id: string,
    confidence: number | null,
    responseTimeFirstJudgment: number | null,
}

export type PageFlowOutput = {
    id: string,
    type:string,
    output: string | number | null,
    responseTimeFirst: number | null,
    accuracy?: number | null, //only for buttons
    scalePoints?: number | null, //only for likert
}