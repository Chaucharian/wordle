import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { AccuracyLevel, ILetter } from "commons/types";
import { FC } from "react";
import { Letter } from "../Letter";

export interface IKeyboardProps {
  selectedKeys?: string[];
  onChange: (letter: ILetter) => void;
  onRemove: () => void;
  onSubmit: () => void;
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

const keyboard = keys.map<ILetter>((letter) => ({
  letter,
  accuracy: AccuracyLevel.initial,
}));

export const Keyboard: FC<IKeyboardProps> = ({
  selectedKeys,
  onChange,
  onSubmit,
  onRemove,
}) => {
  const bg = useColorModeValue("gray.300", "gray.600");

  const handleClick = (key: ILetter) => {
    if (key.letter === "ENTER") {
      return onSubmit();
    }
    if (key.letter === "BACK") {
      return onRemove();
    }
    onChange(key);
  };

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
        {keyboard.map((key) => (
          <HStack>
            {key.letter === "Q" && <Box w="10px" />}
            {key.letter === "A" && <Box w="20px" />}
            <Letter letter={key} onClick={handleClick} />
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};
