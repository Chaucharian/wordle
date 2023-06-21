import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButtonProps,
  Switch,
} from "@chakra-ui/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const value = useColorModeValue("dark", "light");

  return <Switch onChange={toggleColorMode} value={value} />;
};
