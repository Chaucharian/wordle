import { ILetter } from "./Letter";

export interface IGameActions {
  changeFirstTimeState: () => void;
  writeLetter: (letter: ILetter) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  reset: () => void;
}
