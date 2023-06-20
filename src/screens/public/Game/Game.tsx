import { useColorModeValue, VStack } from "@chakra-ui/react";
import { Keyboard, BoardHeader, Board } from "commons/components/ui";
import { useGameActionsContext } from "contexts/Game";
import { FC } from "react";

export interface IGameScreenProps {}

export const Game: FC<IGameScreenProps> = () => {
  const { writeLetter, removeLetter, submitGuess } = useGameActionsContext();
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <VStack w="100%" bg={bg} h="100vh" pt="83px" spacing="8">
      <BoardHeader />
      <Board />
      <Keyboard
        onChange={writeLetter}
        onRemove={removeLetter}
        onSubmit={submitGuess}
      />
    </VStack>
  );
};
