import { ILetter } from "./Letter";
import { IUserSession } from "./UserSession";

export interface IGameState {
  letters: ILetter[] | [];
  session: IUserSession | null;
  nextWordTime: string;
  isLoading: boolean;
  pause: boolean;
  secretWord: string;
  userWon: boolean;
  gameOver: boolean;
  isFirstTime: boolean;
}
