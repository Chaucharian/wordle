import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { ILetter } from "commons/types";
import { FC, useMemo } from "react";

export interface ILetterProps extends Omit<ButtonProps, "onClick"> {
  size?: "sm" | "md";
  letter: ILetter;
  onClick?: (letter: ILetter) => void;
}

export const Letter: FC<ILetterProps> = ({
  size = "sm",
  letter,
  onClick = () => {},
  ...rest
}) => {
  const colors = useMemo(() => {
    const bg = {
      contains: "yellow.300",
      perfect: "green.600",
      none: "gray.500",
      initial: "gray.400",
    };
    const text = {
      contains: "white",
      perfect: "white",
      none: "white",
      initial: "gray.900",
    };
    return { bg: bg[letter.accuracy], text: text[letter.accuracy] };
  }, [letter]);
  return (
    <Button
      bgColor={colors.bg}
      borderRadius="md"
      py={size === "sm" ? 1.2 : 9}
      px={size === "sm" ? 1.5 : 4}
      onClick={() => onClick(letter)}
      {...rest}
    >
      <Text color={colors.text} fontSize={size === "sm" ? "18px" : "35px"}>
        {letter.letter}
      </Text>
    </Button>
  );
};
