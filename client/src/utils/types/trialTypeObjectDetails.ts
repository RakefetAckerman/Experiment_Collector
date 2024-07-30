// trialTypeObjectDetails.ts

export interface ComponentSettings {
  path: string; // The path of the component
  props: object; // The necessay props of the component as object
}

export interface ComponentsSettingsByCondition {
  [conditionDescription: string]: ComponentSettings[]; // Could be any Condtion named with it's own array of Componenet Settings
}

export interface TrialTypeObjectDetails {
  shuffled: boolean;
  componentsSettingsByCondition: ComponentsSettingsByCondition; // An object that holds to each condition it's own component settings
}
