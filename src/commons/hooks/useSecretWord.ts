import { GET_WORDS_URL, getWordsApi } from "@api";
import { useQuery } from "@tanstack/react-query";
import { formatTime } from "commons/helpers/formatTime";
import { removeSpecialCharacters } from "commons/helpers/removeSpecialCharacters";
import { selectFromRandom } from "commons/helpers/selectFromRandom";
import { useState, useEffect, useCallback, useMemo } from "react";

export interface useSecretWordOptions {
  nextWordDefaultTime: number;
}
export interface useSecretWordValues {
  isLoading: boolean;
  secretWord: string;
  nextWordTime: string;
  nextWordTimeMilli: number;
  reset: () => void;
}

export const useSecrectWord = ({
  nextWordDefaultTime,
}: useSecretWordOptions): useSecretWordValues => {
  const { data, isLoading, isSuccess } = useQuery([GET_WORDS_URL], getWordsApi);
  const [secretWord, setSecretWord] = useState("");
  const [nextWordTimeMilli, setNextWordTimeMilli] =
    useState(nextWordDefaultTime);
  const nextWordTime = useMemo(
    () => formatTime(new Date(nextWordTimeMilli)),
    [nextWordTimeMilli]
  );

  const init = useCallback(
    (data: string) => {
      // NORMALIZE AND GET ONLY WORDS WITH 5 LETTERS
      setSecretWord(
        removeSpecialCharacters(
          selectFromRandom(data.split("\n").filter((word) => word.length === 5))
        ).toUpperCase()
      );
    },
    [setSecretWord]
  );

  const reset = useCallback(() => {
    if (data) {
      init(data);
      setNextWordTimeMilli(nextWordDefaultTime);
    }
  }, [setNextWordTimeMilli, nextWordDefaultTime, init, data]);

  useEffect(() => {
    if (isSuccess) {
      init(data);
    }
  }, [isSuccess, init, data]);

  useEffect(() => {
    const id = setTimeout(
      () => setNextWordTimeMilli(nextWordTimeMilli - 1000),
      1000
    );
    return () => clearTimeout(id);
  }, [nextWordTimeMilli]);

  return { reset, secretWord, nextWordTime, nextWordTimeMilli, isLoading };
};
