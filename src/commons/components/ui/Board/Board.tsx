import { Box, HStack, Skeleton, VStack } from "@chakra-ui/react";
import { ILetter } from "commons/types";
import { useGameContext } from "contexts/Game";
import { FC } from "react";
import { Letter } from "../Letter";
import { useBoardLetters } from "./hooks/useBoardLetters";

export interface BoardProps {
  words?: ILetter[];
}

export const Board: FC<BoardProps> = ({ words }) => {
  const { isLoading } = useGameContext();
  const { letters } = useBoardLetters();

  return (
    <VStack w="500px" borderRadius="xl" justifyContent="center">
      <Skeleton isLoaded={!isLoading} p={3}>
        <HStack spacing={4} flexWrap="wrap" justifyContent="center">
          {letters.map((letter) => (
            <>
              {letter ? (
                <Letter letter={letter} size="md" w="20" h="20" />
              ) : (
                <Box
                  w="20"
                  h="20"
                  bgColor="gray.400"
                  borderRadius="lg"
                  opacity="30%"
                />
              )}
            </>
          ))}
        </HStack>
      </Skeleton>
    </VStack>
  );
};
