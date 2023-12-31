import { ILetter } from "commons/types";
import { useGameContext } from "contexts/Game";
import { useEffect, useState } from "react";

const spaces = new Array(5 * 5).fill(null);

export const useBoardLetters = () => {
  const { letters: gameLetters } = useGameContext();
  const [letters, setLetters] = useState<ILetter[] | undefined[]>([]);

  useEffect(() => {
    setLetters(spaces.map((space, index) => gameLetters[index]));
  }, [gameLetters]);

  return { letters };
};
