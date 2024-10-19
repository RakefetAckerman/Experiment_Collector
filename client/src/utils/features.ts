import {TrialTypeType} from "./types/experimentTypes/experimentsTypes.ts";

export type Features = {
    idle?: boolean,
    zoom?: boolean,
    focus?: boolean,
    responseTimeLast?: boolean,
}

/**
 * Test which features are true and which are false and returns it;
 * @param trialType the current trial type
 */
function getFeatures(trialType: TrialTypeType): Features {
    const features: Features = {
        zoom: false,
        idle: false,
        focus: false,
        responseTimeLast: false,
    };

    if (!('features' in trialType.objectDetails) ||
        typeof trialType.objectDetails.features !== 'object' ||
        trialType.objectDetails.features === null) {
        return features;
    }

    const objectFeatures = trialType.objectDetails.features as Record<string, unknown>;

    // Check for every element in the Features type
    (Object.keys(features) as Array<keyof Features>).forEach(key => {
        if (key in objectFeatures && typeof objectFeatures[key] === 'boolean') {
            features[key] = objectFeatures[key] as boolean;
        }
    });

    return features;
}

/**
 * updating the state the output object with the idle time
 * @param output the output object. Insure it isn't a state object!
 * @param totalTimeIdle the total time the user was in idle.
 */
export function updateIdle(output :object , totalTimeIdle:number) {
    return {...output, Idle: totalTimeIdle};
}

/**
 * updating the responseTimeLast
 * @param output the output object. Insure it isn't a state object!
 * @param responseTimeLast the last time the user interacted with the trail
 */
export function updateResponseTimeLast(output :object , responseTimeLast:number) {
    return {...output, ResponseTimeLast: responseTimeLast};
}

export function updateFocus(output :object , responseTimeLast:number , unFocusTime:number) {
    let outOfFocusPercentage =  0
    if (unFocusTime > 0){
        outOfFocusPercentage = (100 *(unFocusTime/responseTimeLast));
    }
    const focus = {
        unFocusTime: unFocusTime,
        outOfFocusPercentage: outOfFocusPercentage,
        inFocusPercentage: 100 - outOfFocusPercentage,
    }
    return {...output, Focus: focus};
}

export type FeaturesDataType = {
    totalIdleTime: number,
    unFocusTime:number,
    responseTimeLast:number,

}
export function updateByFeatures(features: Features, featuresData: FeaturesDataType, newOutput: object) :object{
    if (features.idle){
        newOutput = updateIdle(newOutput , featuresData.totalIdleTime);
    }
    if(features.responseTimeLast){
        newOutput = updateResponseTimeLast(newOutput , featuresData.responseTimeLast)
    }
    if(features.focus){
        newOutput = updateFocus(newOutput , featuresData.responseTimeLast , featuresData.unFocusTime)
    }
    // if (features.zoom){
    //
    // }
    return newOutput;
}



export default getFeatures;