import { AccuracyLevel, ILetter } from "commons/types";
import { IGameState } from "commons/types/GameState";
import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useSecrectWord } from "./hooks/useSecretWord";
import { useSubmitWord } from "./hooks/useSubmitWord";
import { useSession } from "./hooks/useSession";
import { IGameActions } from "commons/types/GameActions";

const NEXT_WORD_INTERVAL = 1000 * 60 * 5;

const initialGameState: IGameState = {
  letters: [],
  session: null,
  isLoading: true,
  secretWord: "",
  userWon: false,
  gameOver: false,
  isFirstTime: true,
  nextWordTime: "",
  pause: false,
};

const GameContext = createContext<IGameState>(initialGameState);
const GameActionsContext = createContext<IGameActions>({
  changeFirstTimeState: () => {},
  writeLetter: () => {},
  removeLetter: () => {},
  submitGuess: () => {},
  reset: () => {},
});

export const GameProvider = ({ children }: any) => {
  const {
    changeFirstTimeState,
    changeSession,
    session,
    isFirstTime,
    isLoading: isSessionLoading,
  } = useSession();
  const {
    isLoading: isLoadingSecretWord,
    secretWord,
    nextWordTime,
    nextWordTimeMilli,
    reset: resetSecretWord,
  } = useSecrectWord({ nextWordDefaultTime: NEXT_WORD_INTERVAL });
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [userWon, setUserWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const wordAttempt = useMemo(
    () => [...letters].slice(attempts >= 1 ? attempts * 5 : 0, letters.length),
    [letters, attempts]
  );
  const {
    isSubmitEnabled,
    lastWord,
    reset: resetSubmit,
  } = useSubmitWord({ letters: wordAttempt });
  const isLoading = useMemo(
    () => isLoadingSecretWord || isSessionLoading,
    [isLoadingSecretWord, isSessionLoading]
  );

  console.log("GAME STATE  ", {
    secretWord,
  });

  const writeLetter = useCallback(
    (letter: ILetter) => {
      if (!isSubmitEnabled) {
        const newLetters = [...letters];
        newLetters.push(letter);
        setLetters(newLetters);
      }
    },
    [setLetters, letters, isSubmitEnabled]
  );

  const removeLetter = useCallback(() => {
    const newLetters = [...letters];
    newLetters.pop();
    setLetters(newLetters);
  }, [setLetters, letters]);

  const reset = useCallback(() => {
    setLetters([]);
    setGameOver(false);
    setUserWon(false);
    setAttempts(0);
    resetSecretWord();
  }, [setLetters, resetSecretWord, setAttempts, setUserWon, setGameOver]);

  const changeWordState = useCallback(
    (word: ILetter[]) => {
      const newLetters = letters.map((letter, index) => {
        if (letters.length - (index + 1) <= 5) {
          const match = word.find(
            (wordLetter) => wordLetter.letter === letter.letter
          );
          if (match) {
            return match;
          }
        }
        return letter;
      });

      setLetters(newLetters);
    },
    [letters, setLetters]
  );

  const submitGuess = useCallback(() => {
    const matchingChars: ILetter[] = [];

    if (isSubmitEnabled) {
      if (lastWord === secretWord) {
        secretWord.split("").forEach((letter) =>
          matchingChars.push({
            letter: letter,
            accuracy: AccuracyLevel.perfect,
          })
        );
        changeWordState(matchingChars);
        setAttempts((prevAttempts) => prevAttempts + 1);
        changeSession({
          played: session.played + 1,
          victories: session.victories + 1,
        });
        setUserWon(true);
      } else {
        for (let i = 0; i < secretWord.length; i++) {
          const secreWordLetter = secretWord[i];
          const guessWordLetter = lastWord[i];
          if (secreWordLetter === guessWordLetter) {
            matchingChars.push({
              letter: guessWordLetter,
              accuracy: AccuracyLevel.perfect,
            });
          } else if (secretWord.includes(guessWordLetter)) {
            matchingChars.push({
              letter: guessWordLetter,
              accuracy: AccuracyLevel.contains,
            });
          } else {
            matchingChars.push({
              letter: guessWordLetter,
              accuracy: AccuracyLevel.none,
            });
          }
        }
        changeWordState(matchingChars);
        resetSubmit();
        setAttempts((prevAttempts) => prevAttempts + 1);
        // BOARD FULL
        if (letters.length === 25) {
          changeSession({
            played: session.played + 1,
            victories: session.victories,
          });
          setGameOver(true);
        }
      }
    }
  }, [
    changeWordState,
    changeSession,
    letters,
    session,
    isSubmitEnabled,
    lastWord,
    secretWord,
    resetSubmit,
  ]);

  // IF TIME LIMIT REACHED
  useEffect(() => {
    if (nextWordTimeMilli === 0) {
      reset();
      resetSecretWord();
    }
  }, [nextWordTimeMilli, reset, resetSecretWord]);

  const value = useMemo(
    () => ({
      ...initialGameState,
      nextWordTime,
      secretWord,
      gameOver,
      userWon,
      session,
      isFirstTime,
      letters,
      isLoading,
    }),
    [
      nextWordTime,
      secretWord,
      gameOver,
      userWon,
      session,
      isFirstTime,
      letters,
      isLoading,
    ]
  );

  const actions = useMemo(
    () => ({
      reset,
      changeFirstTimeState,
      writeLetter,
      removeLetter,
      submitGuess,
    }),
    [changeFirstTimeState, removeLetter, writeLetter, submitGuess, reset]
  );

  return (
    <GameContext.Provider value={value}>
      <GameActionsContext.Provider value={actions}>
        {children}
      </GameActionsContext.Provider>
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be inside GameContext");
  }

  return context;
};

export const useGameActionsContext = () => {
  const context = useContext(GameActionsContext);
  if (context === undefined) {
    throw new Error("useGameActionsContext must be inside GameContext");
  }

  return context;
};
