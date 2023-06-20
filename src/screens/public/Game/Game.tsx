import { useColorModeValue, VStack } from "@chakra-ui/react";
import { ModalTypes } from "commons/components/modals";
import { Keyboard, BoardHeader, Board } from "commons/components/ui";
import { useGameActionsContext, useGameContext } from "contexts/Game";
import { useModal } from "contexts/Modal";
import { FC, useEffect, useCallback } from "react";

export interface IGameScreenProps {}

export const Game: FC<IGameScreenProps> = () => {
  const {
    writeLetter,
    removeLetter,
    submitGuess,
    changeFirstTimeState,
    reset,
  } = useGameActionsContext();
  const {
    isFirstTime,
    isLoading,
    session,
    nextWordTime,
    gameOver,
    userWon,
    secretWord,
  } = useGameContext();
  const { showModal, hideModal } = useModal();
  const bg = useColorModeValue("gray.50", "gray.800");

  const openInstructions = useCallback(() => {
    showModal(ModalTypes.INSTRUCTIONS, {
      onSubmit: () => {
        changeFirstTimeState();
        hideModal();
      },
    });
  }, [showModal, changeFirstTimeState, hideModal]);

  const openStats = useCallback(
    (secretWord?: string) => {
      showModal(ModalTypes.STATS, {
        metadata: { session, nextWordTime, secretWord },
        onSubmit: () => {
          hideModal();
          reset();
        },
      });
    },
    [showModal, hideModal, reset, session, nextWordTime]
  );

  useEffect(() => {
    // console.log(isFirstTime);
    if (!isLoading) {
      if (isFirstTime) {
        openInstructions();
      }
      if (userWon) {
        openStats();
      }
      if (gameOver) {
        openStats(secretWord);
      }
    }
  }, [
    isFirstTime,
    isLoading,
    openInstructions,
    openStats,
    gameOver,
    userWon,
    secretWord,
  ]);

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
