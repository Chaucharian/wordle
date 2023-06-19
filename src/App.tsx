import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
} from "@chakra-ui/react";
import { RootRouter } from "@screens";
import { BrowserRouter } from "react-router-dom";

export const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {/* <ChakraProvider theme={theme}> */}
      <ColorModeProvider>
        <CSSReset />
        <RootRouter />
      </ColorModeProvider>
    </ThemeProvider>
    {/* </ChakraProvider> */}
  </BrowserRouter>
);
