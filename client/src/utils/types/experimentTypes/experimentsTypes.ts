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
    trailTypes: TrialType[]
}
export type TrialType = {
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
    correct?: string
}
