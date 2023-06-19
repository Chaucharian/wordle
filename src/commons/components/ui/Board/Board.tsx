import { Box, HStack, VStack } from "@chakra-ui/react";
import { ILetter } from "commons/types";
import { FC } from "react";
import { Letter } from "../Letter";

export interface BoardProps {
  words?: ILetter[];
}

const spaces = new Array(5 * 5).fill(null);

export const Board: FC<BoardProps> = ({ words }) => {
  return (
    <VStack
      w="500px"
      bg="gray.300"
      opacity="30%"
      borderRadius="xl"
      p={3}
      justifyContent="center"
    >
      <HStack spacing={4} flexWrap="wrap" justifyContent="center">
        {spaces.map((space) => (
          <>
            {space ? (
              <Letter letter={{ letter: space, accuracy: "perfect" }} />
            ) : (
              <Box w="75px" h="76px" bgColor="gray.400" borderRadius="lg" />
            )}
          </>
        ))}
      </HStack>
    </VStack>
  );
};
