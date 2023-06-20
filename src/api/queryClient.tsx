import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await axios.get(`${queryKey[0]}`);
  return data;
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
