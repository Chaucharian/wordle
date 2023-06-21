import { ModalTypes } from "commons/components/modals";
import { useGameActionsContext, useGameContext } from "contexts/Game";
import { useModal } from "contexts/Modal";
import { useEffect, useCallback } from "react";

export const useModals = () => {
  const { changeFirstTimeState, reset } = useGameActionsContext();
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

  return { openStats, openInstructions };
};
