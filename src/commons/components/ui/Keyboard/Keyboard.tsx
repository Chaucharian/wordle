import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Letter } from "../Letter";

export interface IKeyboardProps {
  selectedKeys?: string[];
}

export const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "BACK",
];

export const Keyboard: FC<IKeyboardProps> = ({ selectedKeys }) => {
  const bg = useColorModeValue("gray.300", "gray.600");

  return (
    <VStack
      w="638px"
      bg={bg}
      opacity="30%"
      h="200px"
      borderRadius="xl"
      p={3}
      justifyContent="center"
    >
      <HStack spacing={4} flexWrap="wrap" justifyContent="center">
        {keys.map((key) => (
          <HStack>
            {key === "Q" && <Box w="10px" />}
            {key === "A" && <Box w="20px" />}
            <Letter letter={{ letter: key, accuracy: "initial" }} />
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};
