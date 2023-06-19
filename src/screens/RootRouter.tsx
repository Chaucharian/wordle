import { Routes, Route } from "react-router-dom";
import { Game } from "./public/Game";

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
    </Routes>
  );
};
