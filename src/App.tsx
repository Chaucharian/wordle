import {
  ChakraProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";
import { RootRouter } from "@screens";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "@api";
import { QueryClientProvider } from "@tanstack/react-query";
import { GameProvider } from "contexts/Game";

export const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <GameProvider>
            <RootRouter />
          </GameProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
