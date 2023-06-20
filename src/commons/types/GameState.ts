import { ILetter } from "./Letter";
import { IUserSession } from "./UserSession";

export interface IGameState {
  letters: ILetter[] | [];
  session: IUserSession | null;
  nextWordTime: number;
  isLoading: boolean;
  pause: boolean;
  isFirstTime: true;
}
