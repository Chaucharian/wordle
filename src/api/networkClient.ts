import axios from "axios";

export const networkClient = axios.create({
  baseURL: "/d2945/words/-/raw/main",
  headers: {
    "Content-Type": "application/json",
  },
});
