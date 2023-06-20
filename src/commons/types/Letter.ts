export enum AccuracyLevel {
  "contains" = "contains",
  "perfect" = "perfect",
  "none" = "none",
  "initial" = "initial",
}
export interface ILetter {
  accuracy: AccuracyLevel;
  letter: string;
  id?: string;
}
