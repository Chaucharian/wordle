import { useColorModeValue, VStack } from "@chakra-ui/react";
import { Keyboard, BoardHeader, Board } from "commons/components/ui";
import { useModals } from "commons/hooks";
import { useGameActionsContext } from "contexts/Game";
import { FC } from "react";

export interface IGameScreenProps {}

export const Game: FC<IGameScreenProps> = () => {
  const { writeLetter, removeLetter, submitGuess } = useGameActionsContext();
  const { openStats, openInstructions } = useModals();
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <VStack w="100%" bg={bg} h="100vh" pt="83px" spacing="8">
      <BoardHeader
        onInstructionsOpen={() => openInstructions()}
        onStatsOpen={() => openStats()}
      />
      <Board />
      <Keyboard
        onChange={writeLetter}
        onRemove={removeLetter}
        onSubmit={submitGuess}
      />
    </VStack>
  );
};
