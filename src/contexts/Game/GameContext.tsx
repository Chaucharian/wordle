import { GET_WORDS_URL, getWordsApi } from "@api*";
import { useQuery } from "@tanstack/react-query";
import { AccuracyLevel, ILetter } from "commons/types";
import { IGameState } from "commons/types/GameState";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useSecrectWord } from "./hooks/useSecretWord";
import { useSubmitWord } from "./hooks/useSubmitWord";
import { v4 } from "uuid";

const initialGameState: IGameState = {
  letters: [],
  session: null,
  isLoading: true,
  isFirstTime: true,
  nextWordTime: 1000 * 60 * 5,
  pause: false,
};

const GameContext = createContext<IGameState>(initialGameState);
const GameActionsContext = createContext<any>({});

export const GameProvider = ({ children }: any) => {
  const { isLoading, secretWord } = useSecrectWord({});
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [attempts, setAttempts] = useState(0);
  const rowIndex = attempts * letters.length - 5;
  const wordAttempt = useMemo(
    () => [...letters].slice(attempts >= 1 ? attempts * 5 : 0, letters.length),
    [letters, rowIndex, attempts]
  );
  const {
    isSubmitEnabled,
    lastWord,
    reset: resetSubmit,
  } = useSubmitWord({ letters: wordAttempt });
  const [guess, setGuess] = useState("");

  const [feedback, setFeedback] = useState("");

  console.log("ATTEMPT ", {
    wordAttempt,
    attempts,
    rowIndex,
    secretWord,
    letters,
  });

  const writeLetter = useCallback(
    (letter: ILetter) => {
      if (!isSubmitEnabled) {
        const newLetters = [...letters];
        newLetters.push({ ...letter, id: v4() });
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
    [letters, setLetters, wordAttempt]
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
        setFeedback(matchingChars.join(""));
        setAttempts((prevAttempts) => prevAttempts + 1);
      }
      setGuess("");
    }
  }, [changeWordState, isSubmitEnabled, lastWord, secretWord, resetSubmit]);

  const value = useMemo(
    () => ({
      ...initialGameState,
      letters,
      isLoading,
    }),
    [isLoading, letters]
  );

  const actions = useMemo(
    () => ({
      secretWord,
      guess,
      attempts,
      feedback,
      writeLetter,
      removeLetter,
      submitGuess,
    }),
    [
      removeLetter,
      writeLetter,
      secretWord,
      guess,
      attempts,
      feedback,
      submitGuess,
    ]
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
