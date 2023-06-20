import { GET_WORDS_URL, getWordsApi, IGetWordsResponse } from "@api";
import { useQuery } from "@tanstack/react-query";
import { removeSpecialCharacters } from "commons/helpers/removeSpecialCharacters";
import { selectFromRandom } from "commons/helpers/selectFromRandom";
import { useState, useEffect, useCallback } from "react";

export interface useSecretWordOptions {}
export interface useSecretWordValues {
  isLoading: boolean;
  secretWord: string;
  reset: () => void;
}

export const useSecrectWord = (
  options: useSecretWordOptions
): useSecretWordValues => {
  const { data, isLoading, isSuccess } = useQuery([GET_WORDS_URL], getWordsApi);
  const [secretWord, setSecretWord] = useState("");

  const init = useCallback(
    (data: string) => {
      // NORMALIZE AND GET ONLY WORDS WITH 5 LETTERS
      setSecretWord(
        removeSpecialCharacters(
          selectFromRandom(data.split("\n").filter((word) => word.length == 5))
        ).toUpperCase()
      );
    },
    [setSecretWord]
  );

  const reset = useCallback(() => {
    if (data) {
      init(data);
    }
  }, [setSecretWord, init, data]);

  useEffect(() => {
    if (isSuccess) {
      init(data);
    }
  }, [isSuccess, init, data]);

  return { reset, secretWord, isLoading };
};
