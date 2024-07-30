// experimentObjectDetails.ts

export interface TrialTypeSettings {
  shuffledQuestions: string[]; // An array of IDs that each ID is id of a trial type within the database which is selected by the researcher to be shuffled
  internalDisplayOrder: boolean[]; // The order within the trial type, true - the current trial type is static, false - the trial type is shuffled
  orderedQuestions: string[]; // An array of IDs that each ID is id of a trial type within the database which is selected by the researcher to be static
}

export interface TrialTypesDetails {
  [trialTypeName: string]: TrialTypeSettings; // An Object of each trial type settings
}

export interface ExperimentObjectDetails {
  conditions: string[]; // The available conditions to this experiment
  prcedure: string[]; // An array of eah trial type to display next by order, the internalDisplayOrder of each trial type will determine if its shuffled or static
  trialTypes: TrialTypesDetails;
}

// Displaying a question: at first pop the first trial type from the procedure array -> based on the trial type pop out of  from internalDisplayOrder the next question -> if true pop out from orderedQuestions a question id otherwise pop out from shuffledQuestions random question id and fetch it from the database

// Constructing a question: at first push the trial type to the procedure array -> based on the trial type push to internalDisplayOrder the next question -> if true push into orderedQuestions  the question id otherwise push into  shuffledQuestions the question id and update the expriment within from the database
