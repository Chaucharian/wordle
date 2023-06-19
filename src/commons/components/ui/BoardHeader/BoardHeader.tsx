import { HStack, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { ILetter } from "commons/types";
import { FC } from "react";
import { IconQuestionMark, IconChartBar } from "@tabler/icons-react";
import { ColorModeSwitcher } from "commons/components/forms/ColorThemeSwitch";

export interface BoardHeaderProps {
  words?: ILetter[];
}

export const BoardHeader: FC<BoardHeaderProps> = ({ words }) => {
  const bg = useColorModeValue("gray.300", "gray.600");

  return (
    <HStack
      w="638px"
      h="84px"
      bg={bg}
      borderRadius="xl"
      p={3}
      justifyContent="space-between"
    >
      <IconButton
        rounded="full"
        aria-label="ask"
        icon={<IconQuestionMark size={20} color="black" />}
      />

      <Text fontSize="4xl" color="black" fontWeight="bold">
        WORDLE
      </Text>
      <HStack spacing={2}>
        <IconButton
          rounded="full"
          aria-label="ask"
          icon={<IconChartBar size={20} color="black" />}
        />
        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
};
