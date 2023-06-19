import {
  Box,
  Button,
  useColorModeValue,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import { theme } from "@theme*";
import { Keyboard, BoardHeader, Board } from "commons/components/ui";
import { FC } from "react";

export interface IGameScreenProps {}

export const Game: FC<IGameScreenProps> = () => {
  // const theme = useTheme();
  // useColorModeValue(theme.colors)
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <VStack
      w="100%"
      // bg="gray.50"
      bg={bg}
      h="100vh"
      pt="83px"
      spacing="8"
    >
      <BoardHeader />
      <Board />
      <Keyboard />
    </VStack>
  );
};
