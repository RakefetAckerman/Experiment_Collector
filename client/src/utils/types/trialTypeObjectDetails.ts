// trialTypeObjectDetails.ts

export interface ComponentSettings {
  path: string; // The path of the component
  props: object; // The necessay props of the component as object
}

export interface ComponentsSettingsByCondition {
  components: ComponentSettings[]; // Could be any Condtion named with it's own array of Componenet Settings
  lockBeforeUse: boolean[]; // An array of flags that sign on which component is not enabled before use and some there are
}

export interface TrialTypeObjectDetails {
  shuffled: boolean;
  componentsSettingsByCondition: ComponentsSettingsByCondition; // An object that holds to each condition it's own component settings
}
