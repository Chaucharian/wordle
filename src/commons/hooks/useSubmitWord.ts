import { ILetter } from "commons/types";
import { useEffect, useState } from "react";

export interface useSubmitWordOptions {
  letters: ILetter[];
}
export const useSubmitWord = ({ letters }: useSubmitWordOptions) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [lastWord, setLastWord] = useState("");

  useEffect(() => {
    if (letters.length === 5) {
      setLastWord(
        letters
          .map((letter) => letter.letter)
          .join("")
          .toUpperCase()
      );
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [letters, setIsSubmitEnabled]);

  const reset = () => {
    setLastWord("");
  };

  return { isSubmitEnabled, lastWord, reset };
};
