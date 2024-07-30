// metaSettingsValues.ts

export interface TimeSettings {
  displayAlert: boolean;
  seconds: string;
  idleMessage: string;
}

export interface AdditionalSettings {
  shuffledQuestion: boolean;
  trackFocus: boolean;
}

export interface MetaSettingsValues {
  time: TimeSettings;
  response: string;
  additionalSettings: AdditionalSettings;
}

export const initialMetaSettingsValues: MetaSettingsValues = {
  time: {
    displayAlert: false,
    seconds: "",
    idleMessage: "",
  },
  response: "",
  additionalSettings: {
    shuffledQuestion: false,
    trackFocus: false,
  },
};
