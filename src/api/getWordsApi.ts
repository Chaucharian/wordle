import { networkClient } from "./networkClient";

export const GET_WORDS_URL = "/words.txt";

export type IGetWordsResponse = string;

export const getWordsApi = async ({}: any) => {
  const { data } = await networkClient.get<IGetWordsResponse>(GET_WORDS_URL);
  return data;
};
